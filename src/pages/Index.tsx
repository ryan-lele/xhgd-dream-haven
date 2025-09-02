import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Sparkles, Camera } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { StoryCard } from "@/components/StoryCard";
import { PlayerSection } from "@/components/PlayerSection";
import { FloatingCharacters } from "@/components/FloatingCharacters";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ARView from "@/components/ARView";
import PhotoBoothView from "@/features/PhotoBooth/App";
import { GeminiAPITest } from "@/features/GeminiTest/GeminiAPITest";
import { GeminiImageTest } from "@/features/GeminiTest/GeminiImageTest";
import forestDreams from "../assets/forest-dreams.png";
import elephantFridge from "../assets/elephant-fridge.png";
import moonlightDragon from "../assets/moonlight-dragon.png";
import cloudBunny from "../assets/cloud-bunny.png";
import forestOwl from "../assets/forest-owl.png";
import skyWhale from "../assets/sky-whale.png";
import cloudCottage from "../assets/cloud-cottage.png";
import flowerHedgehog from "../assets/flower-hedgehog.png";

const stories = [
  {
    id: "forest-dreams",
    title: { en: "Forest Dreams", zh: "森林之梦" },
    description: { en: "A peaceful fox dreams under the moonlit forest canopy", zh: "一只安静的狐狸在月光森林中安睡" },
    image: forestDreams,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: "elephant-adventures", 
    title: { en: "Mr. Elephant & The Fridge", zh: "大象先生与冰箱" },
    description: { en: "A gentle elephant shares magical bedtime snacks", zh: "温柔的大象分享神奇的睡前小食" },
    image: elephantFridge,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: "moonlight-dragon",
    title: { en: "Moonlight Dragon", zh: "月光小龙" },
    description: { en: "A gentle dragon curls up in the crescent moon for sweet dreams", zh: "温柔的小龙蜷缩在新月里做着甜美的梦" },
    image: moonlightDragon,
    audioUrl: "https://example.com/sleepy_track_1.wav"
  },
  {
    id: "cloud-bunny",
    title: { en: "Cloud Bunny's Adventure", zh: "云朵兔子的冒险" },
    description: { en: "A fluffy bunny floats on clouds through the starry night", zh: "毛茸茸的兔子在星夜中乘着云朵飘行" },
    image: cloudBunny,
    audioUrl: "https://example.com/sleepy_track_2.wav"
  },
  {
    id: "forest-owl",
    title: { en: "Wise Owl's Lullaby", zh: "智慧猫头鹰的摇篮曲" },
    description: { en: "A wise owl hums gentle melodies in the enchanted forest", zh: "聪明的猫头鹰在魔法森林里哼着轻柔的旋律" },
    image: forestOwl,
    audioUrl: "https://example.com/sleepy_track_3.wav"
  },
  {
    id: "sky-whale",
    title: { en: "Sky Whale Journey", zh: "天空鲸鱼之旅" },
    description: { en: "A magical whale carries dreams across the midnight sky", zh: "神奇的鲸鱼载着梦想穿越午夜天空" },
    image: skyWhale,
    audioUrl: "https://example.com/sleepy_track_4.wav"
  },
  {
    id: "cloud-cottage",
    title: { en: "Cloud Cottage Dreams", zh: "云朵小屋之梦" },
    description: { en: "A cozy cottage made of clouds where sleepy cats rest", zh: "由云朵建成的温馨小屋，困倦的小猫在此休息" },
    image: cloudCottage,
    audioUrl: "https://example.com/sleepy_track_5.wav"
  },
  {
    id: "flower-hedgehog",
    title: { en: "Hedgehog's Flower Bed", zh: "刺猬的花床" },
    description: { en: "A peaceful hedgehog sleeps in a magical bed of flowers", zh: "安静的刺猬在神奇的花床上安睡" },
    image: flowerHedgehog,
    audioUrl: "https://example.com/sleepy_track_6.wav"
  },
  {
    id: "starlight-journey",
    title: { en: "Starlight Journey", zh: "星光之旅" },
    description: { en: "Follow the gentle starlight to lands of peaceful dreams", zh: "跟随温柔的星光前往宁静梦境的土地" },
    image: forestDreams,
    audioUrl: "https://example.com/sleepy_track_7.wav"
  },
  {
    id: "moon-lullaby",
    title: { en: "Moonship Lullaby", zh: "月亮船的摇篮曲" },
    description: { en: "Sail on a gentle moonbeam ship to the land of dreams", zh: "乘着温柔的月光船航向梦境之地" },
    image: forestDreams,
    audioUrl: "https://example.com/sleepy_track_8.wav"
  } 
];

const content = {
  en: {
    title: "Choose Your Dream",
    logo: "XHGD Serene Magic"
  },
  zh: {
    title: "选择你的梦境", 
    logo: "XHGD 安睡魔法"
  }
};

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [isAROpen, setIsAROpen] = useState(false);
  const [isPhotoBoothOpen, setIsPhotoBoothOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleStorySelect = (storyId: string) => {
    setSelectedStory(storyId);
  };

  const getSelectedStoryTitle = () => {
    if (!selectedStory) return "";
    const story = stories.find(s => s.id === selectedStory);
    return story ? story.title[language] : "";
  };

  const getSelectedStoryAudio = () => {
    if (!selectedStory) return "";
    const story = stories.find(s => s.id === selectedStory);
    return story ? story.audioUrl : "";
  };

  return (
    <div className="min-h-screen starry-background relative">
      {/* Floating Characters */}
      <FloatingCharacters />
      
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6 relative z-10">
        <div className="text-lg sm:text-xl font-bold text-primary">
          {content[language].logo}
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <LanguageToggle language={language} onToggle={toggleLanguage} />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPhotoBoothOpen(true)}
                className="rounded-full border-primary/30 bg-card/50 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{language === 'zh' ? '进入魔法时光照相馆' : 'Enter Magic Photo Booth'}</p>
            </TooltipContent>
          </Tooltip>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAROpen(true)}
            className="rounded-full border-primary/30 bg-card/50 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Sparkles className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary/30 bg-card/50 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 pb-12 relative z-[2]">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 animate-slide-up">
              {content[language].title}
            </h1>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-4 h-4 rounded-full bg-primary/30 animate-twinkle" style={{ animationDelay: '0s' }} />
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-cozy-amber rounded-full" />
              <div className="w-4 h-4 rounded-full bg-primary/30 animate-twinkle" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Story Cards - Vertical Layout */}
          <div className="space-y-6 sm:space-y-8">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                description={story.description}
                image={story.image}
                language={language}
                onClick={handleStorySelect}
              />
            ))}
          </div>

          {/* Gemini API 测试组件 */}
          <div className="mt-12 space-y-6">
            <GeminiAPITest />
            <GeminiImageTest />
          </div>
        </div>
      </main>

      {/* Player Section */}
      <PlayerSection
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        language={language}
        storyTitle={getSelectedStoryTitle()}
        audioUrl={getSelectedStoryAudio()}
      />

      {/* AR View */}
      <ARView
        isOpen={isAROpen}
        onClose={() => setIsAROpen(false)}
      />

      {/* Photo Booth View */}
      {isPhotoBoothOpen && (
        <div className="fixed inset-0 z-50">
          <PhotoBoothView />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPhotoBoothOpen(false)}
            className="absolute top-4 right-4 z-[60] text-white hover:text-gray-300"
          >
            ✕
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
