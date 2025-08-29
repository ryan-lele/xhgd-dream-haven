import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import guardianBear from "../assets/guardian-bear.png";

interface GuardianModeProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'zh';
}

const content = {
  en: {
    title: "GUARDIAN MODE",
    subtitle: "Sleep App",
    character: "Dream Guardian Bear",
    action: "DEACTIVATE"
  },
  zh: {
    title: "守护模式",
    subtitle: "睡眠应用",
    character: "梦境守护熊",
    action: "关闭"
  }
};

export const GuardianMode = ({ isOpen, onClose, language }: GuardianModeProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-0 max-w-sm bg-background/95 backdrop-blur-sm">
        <div className="text-center space-y-8 py-8">
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-wide text-muted-foreground">
              {content[language].title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {content[language].subtitle}
            </p>
          </div>

          <div className="py-12">
            <div className="w-40 h-40 mx-auto animate-float">
              <img 
                src={guardianBear} 
                alt="Guardian Bear"
                className="w-full h-full object-contain opacity-60"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {content[language].character}
            </p>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full px-8 py-3 border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10"
            >
              {content[language].action}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};