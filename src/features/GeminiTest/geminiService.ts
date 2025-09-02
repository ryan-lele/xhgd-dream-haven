/**
 * @file geminiService.ts
 * @description 封装与 Gemini API 通信的服务。
 * 使用直接提供的测试 API 密钥进行基础通讯测试。
 */

// 使用提供的测试 API 密钥
const API_KEY = "sk-YA6vKC88GC3VF5ktV89tPfAHyM7QwOUcKp3g1AyaibjxXiuw";
const API_BASE = "https://api.apicore.ai/v1/chat/completions";

/**
 * 调用 Gemini API 并返回文本结果。
 * @param prompt - 发送给模型的文本提示。
 * @returns - 模型生成的文本响应。
 */
export async function callGeminiApi(prompt: string): Promise<string> {
  console.log("正在尝试调用 Gemini API...");
  
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        stream: false,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API 调用失败: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "未收到有效回复";
    
    console.log("成功接收到 Gemini API 响应");
    return text;
  } catch (error) {
    console.error("调用 Gemini API 时出错:", error);
    throw error;
  }
}