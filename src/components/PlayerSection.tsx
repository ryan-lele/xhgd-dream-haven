import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { SleepTimer } from "./SleepTimer";
import { GuardianMode } from "./GuardianMode";
import { Play, Pause, SkipBack, SkipForward, Clock, Settings } from "lucide-react";

interface PlayerSectionProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'zh';
  storyTitle: string;
}

export const PlayerSection = ({ isOpen, onClose, language, storyTitle }: PlayerSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showGuardian, setShowGuardian] = useState(false);

  const handleTimerSelect = (minutes: number | 'end') => {
    console.log('Timer set for:', minutes);
    // Simulate timer completion for demo
    setTimeout(() => {
      setShowGuardian(true);
    }, 2000);
  };

  if (showGuardian) {
    return (
      <GuardianMode 
        isOpen={isOpen} 
        onClose={() => {
          setShowGuardian(false);
          onClose();
        }}
        language={language}
      />
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="starry-background border-0 max-w-4xl h-[80vh] p-0">
          <div className="relative w-full h-full flex flex-col">
            {/* Background Theatre Scene */}
            <div className="flex-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40" />
              
              {/* Main content area with magical scene */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-8 animate-slide-up">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-cozy-amber animate-gentle-glow flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl">🌙</span>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">XHGD Serene Magic</h2>
                    <p className="text-lg text-moonbeam">{language === 'en' ? 'The Theater' : '剧场'}</p>
                  </div>
                  
                  <p className="text-primary text-lg">{storyTitle}</p>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="bg-card/80 backdrop-blur-sm border-t border-border/50 p-8">
              <div className="flex items-center justify-center space-x-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 border-primary/30 hover:bg-primary hover:text-primary-foreground"
                  onClick={onClose}
                >
                  <SkipBack className="w-6 h-6" />
                </Button>

                <Button
                  size="lg"
                  className="magic-button w-20 h-20 text-2xl"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 border-primary/30 hover:bg-primary hover:text-primary-foreground"
                >
                  <SkipForward className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTimer(true)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Timer' : '定时器'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Settings' : '设置'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SleepTimer
        isOpen={showTimer}
        onClose={() => setShowTimer(false)}
        language={language}
        onSelectTimer={handleTimerSelect}
      />
    </>
  );
};