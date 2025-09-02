/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Use provided test API directly
const API_KEY = "sk-YA6vKC88GC3VF5ktV89tPfAHyM7QwOUcKp3g1AyaibjxXiuw";
const API_BASE = "https://api.apicore.ai/v1/chat/completions";

// --- Helper Functions ---

/**
 * Creates a fallback prompt to use when the primary one is blocked.
 * @param decade The decade string (e.g., "1950s").
 * @returns The fallback prompt string.
 */
function getFallbackPrompt(decade: string): string {
    return `Create a photograph of the person in this image as if they were living in the ${decade}. The photograph should capture the distinct fashion, hairstyles, and overall atmosphere of that time period. Ensure the final image is a clear photograph that looks authentic to the era.`;
}

/**
 * Extracts the decade (e.g., "1950s") from a prompt string.
 * @param prompt The original prompt.
 * @returns The decade string or null if not found.
 */
function extractDecade(prompt: string): string | null {
    const match = prompt.match(/(\d{4}s)/);
    return match ? match[1] : null;
}

/**
 * A wrapper for the API call that includes a retry mechanism for internal server errors.
 * @param imageDataUrl The base64 image data URL.
 * @param prompt The text prompt.
 * @returns The response from the API.
 */
async function callAPIWithRetry(imageDataUrl: string, prompt: string): Promise<string> {
    const maxRetries = 3;
    const initialDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gemini-2.5-flash-image",
                    stream: false,
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: prompt
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: imageDataUrl
                                    }
                                }
                            ]
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            const data = await response.json();
            
            // Check if the response contains an image URL
            const content = data.choices?.[0]?.message?.content;
            if (typeof content === 'string' && content.includes('http')) {
                // Extract image URL from the response
                const urlMatch = content.match(/https?:\/\/[^\s)]+/);
                if (urlMatch) {
                    return urlMatch[0];
                }
            }
            
            throw new Error(`The AI model did not return a valid image URL. Response: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error(`Error calling API (Attempt ${attempt}/${maxRetries}):`, error);
            const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
            const isInternalError = errorMessage.includes('"code":500') || errorMessage.includes('INTERNAL');

            if (isInternalError && attempt < maxRetries) {
                const delay = initialDelay * Math.pow(2, attempt - 1);
                console.log(`Internal error detected. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            throw error; // Re-throw if not a retriable error or if max retries are reached.
        }
    }
    // This should be unreachable due to the loop and throw logic above.
    throw new Error("API call failed after all retries.");
}


/**
 * Generates a decade-styled image from a source image and a prompt.
 * It includes a fallback mechanism for prompts that might be blocked in certain regions.
 * @param imageDataUrl A data URL string of the source image (e.g., 'data:image/png;base64,...').
 * @param prompt The prompt to guide the image generation.
 * @returns A promise that resolves to an image URL of the generated image.
 */
export async function generateDecadeImage(imageDataUrl: string, prompt: string): Promise<string> {
    // --- First attempt with the original prompt ---
    try {
        console.log("Attempting generation with original prompt...");
        const imageUrl = await callAPIWithRetry(imageDataUrl, prompt);
        return imageUrl;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        const isNoImageError = errorMessage.includes("The AI model did not return a valid image URL");

        if (isNoImageError) {
            console.warn("Original prompt was likely blocked. Trying a fallback prompt.");
            const decade = extractDecade(prompt);
            if (!decade) {
                console.error("Could not extract decade from prompt, cannot use fallback.");
                throw error; // Re-throw the original "no image" error.
            }

            // --- Second attempt with the fallback prompt ---
            try {
                const fallbackPrompt = getFallbackPrompt(decade);
                console.log(`Attempting generation with fallback prompt for ${decade}...`);
                const imageUrl = await callAPIWithRetry(imageDataUrl, fallbackPrompt);
                return imageUrl;
            } catch (fallbackError) {
                console.error("Fallback prompt also failed.", fallbackError);
                const finalErrorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
                throw new Error(`The AI model failed with both original and fallback prompts. Last error: ${finalErrorMessage}`);
            }
        } else {
            // This is for other errors, like a final internal server error after retries.
            console.error("An unrecoverable error occurred during image generation.", error);
            throw new Error(`The AI model failed to generate an image. Details: ${errorMessage}`);
        }
    }
}
