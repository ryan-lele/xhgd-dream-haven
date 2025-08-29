import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface SleepTimerProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'zh';
  onSelectTimer: (minutes: number | 'end') => void;
}

const content = {
  en: {
    title: "Sleep Timer",
    options: ["15 min", "30 min", "End of Story"]
  },
  zh: {
    title: "睡眠定时器",
    options: ["15分钟", "30分钟", "故事结束"]
  }
};

export const SleepTimer = ({ isOpen, onClose, language, onSelectTimer }: SleepTimerProps) => {
  const handleSelect = (index: number) => {
    const values: (number | 'end')[] = [15, 30, 'end'];
    onSelectTimer(values[index]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="starry-background border-border/50 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary">
            {content[language].title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {content[language].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className="timer-option w-full"
            >
              {option}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};