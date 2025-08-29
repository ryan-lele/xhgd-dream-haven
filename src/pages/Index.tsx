import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { StoryCard } from "@/components/StoryCard";
import { PlayerSection } from "@/components/PlayerSection";
import forestDreams from "../assets/forest-dreams.png";
import elephantFridge from "../assets/elephant-fridge.png";
import dreamGuardianBear from "../assets/dream-guardian-bear.png";

const stories = [
  {
    id: "forest-dreams",
    title: { en: "Forest Dreams", zh: "森林之梦" },
    image: forestDreams
  },
  {
    id: "elephant-adventures", 
    title: { en: "Mr. Elephant & The Fridge", zh: "大象先生与冰箱" },
    image: elephantFridge
  },
  {
    id: "starlight-journey",
    title: { en: "Starlight Journey", zh: "星光之旅" },
    image: forestDreams // Reusing for demo
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

  return (
    <div className="min-h-screen starry-background">
      {/* Header */}
      <header className="flex items-center justify-between p-6 relative z-10">
        <div className="text-xl font-bold text-primary">
          {content[language].logo}
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageToggle language={language} onToggle={toggleLanguage} />
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary/30 bg-card/50 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Dream Guardian Bear - Peeking from top-right */}
      <div className="fixed top-[-20px] right-8 z-10 animate-float">
        <img 
          src={dreamGuardianBear} 
          alt="Dream Guardian Bear"
          className="w-24 h-24 object-contain opacity-95"
        />
      </div>

      {/* Main Content - The Hut */}
      <main className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Title with decorative stars */}
          <div className="text-center mb-12 relative">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-gradient-radial from-sleepy-purple/20 via-sleepy-purple/10 to-transparent rounded-full blur-xl" />
            <div className="relative flex items-center justify-center gap-4">
              <div className="w-3 h-3 bg-starlight rounded-full animate-gentle-glow opacity-80" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary animate-slide-up">
                {content[language].title}
              </h1>
              <div className="w-3 h-3 bg-starlight rounded-full animate-gentle-glow opacity-80" />
            </div>
          </div>

          {/* Story Cards - Storybook Layout */}
          <div className="relative">
            <div className="flex items-end justify-center gap-8 overflow-x-auto pb-6 px-4 scrollbar-hide">
              {stories.map((story, index) => (
                <div 
                  key={story.id}
                  className={`
                    ${index === 1 ? 'transform scale-105 -translate-y-4' : ''}
                    transition-all duration-500
                  `}
                >
                  <StoryCard
                    id={story.id}
                    title={story.title}
                    image={story.image}
                    language={language}
                    onClick={handleStorySelect}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Player Section */}
      <PlayerSection
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        language={language}
        storyTitle={getSelectedStoryTitle()}
      />
    </div>
  );
};

export default Index;
