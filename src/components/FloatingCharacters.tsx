import { useEffect, useState } from "react";
import dreamGuardianBear from "../assets/dream-guardian-bear.png";
import floatingElephant from "../assets/floating-elephant.png";
import floatingBear from "../assets/floating-bear.png";
import floatingRabbit from "../assets/floating-rabbit.png";
import floatingOwl from "../assets/floating-owl.png";

interface FloatingCharacter {
  id: string;
  image: string;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

export const FloatingCharacters = () => {
  const [characters, setCharacters] = useState<FloatingCharacter[]>([]);

  useEffect(() => {
    const characterImages = [
      { id: "dream-guardian-bear", image: dreamGuardianBear },
      { id: "elephant", image: floatingElephant },
      { id: "bear", image: floatingBear },
      { id: "rabbit", image: floatingRabbit },
      { id: "owl", image: floatingOwl },
    ];

    const generateCharacters = () => {
      return characterImages.map((char, index) => ({
        ...char,
        x: Math.random() * 80 + 10, // 10% to 90% from left
        y: Math.random() * 60 + 20, // 20% to 80% from top
        scale: Math.random() * 0.6 + 0.6, // 60% to 120%
        duration: Math.random() * 6 + 8, // 8-14 seconds
        delay: index * 0.5, // Stagger the animations
      }));
    };

    setCharacters(generateCharacters());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {characters.map((character) => (
        <div
          key={character.id}
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            left: `${character.x}%`,
            top: `${character.y}%`,
            transform: `scale(${character.scale})`,
            animationDelay: `${character.delay}s`,
          }}
        >
          <img
            src={character.image}
            alt={`Floating ${character.id}`}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-60 floating-character"
            style={{
              animationDuration: `${character.duration}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
};