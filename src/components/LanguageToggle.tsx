import { Button } from "./ui/button";

interface LanguageToggleProps {
  language: 'en' | 'zh';
  onToggle: () => void;
}

export const LanguageToggle = ({ language, onToggle }: LanguageToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className="rounded-full border-primary/30 bg-card/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    >
      {language === 'en' ? '中' : 'EN'}
    </Button>
  );
};