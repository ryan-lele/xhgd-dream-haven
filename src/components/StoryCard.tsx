interface StoryCardProps {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  image: string;
  language: 'en' | 'zh';
  onClick: (id: string) => void;
}

export const StoryCard = ({ id, title, description, image, language, onClick }: StoryCardProps) => {
  return (
    <div 
      className="story-card w-full cursor-pointer group mb-6"
      onClick={() => onClick(id)}
    >
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
        <img 
          src={image} 
          alt={title[language]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium text-primary text-center mb-2">
          {title[language]}
        </h3>
        <p className="text-sm text-muted-foreground text-center">
          {description[language]}
        </p>
      </div>
    </div>
  );
};