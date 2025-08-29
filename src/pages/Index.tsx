import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { StoryCard } from "@/components/StoryCard";
import { PlayerSection } from "@/components/PlayerSection";
import forestDreams from "../assets/forest-dreams.png";
import elephantFridge from "../assets/elephant-fridge.png";

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

      {/* Main Content - The Hut */}
      <main className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-slide-up">
              {content[language].title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-cozy-amber mx-auto rounded-full" />
          </div>

          {/* Story Cards */}
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-6 px-4 scrollbar-hide">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  image={story.image}
                  language={language}
                  onClick={handleStorySelect}
                />
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
