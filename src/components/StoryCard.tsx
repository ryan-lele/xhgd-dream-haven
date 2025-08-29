interface StoryCardProps {
  id: string;
  title: { en: string; zh: string };
  image: string;
  language: 'en' | 'zh';
  onClick: (id: string) => void;
}

export const StoryCard = ({ id, title, image, language, onClick }: StoryCardProps) => {
  return (
    <div 
      className="story-card min-w-[280px] cursor-pointer group"
      onClick={() => onClick(id)}
    >
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
        <img 
          src={image} 
          alt={title[language]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-primary text-center">
          {title[language]}
        </h3>
      </div>
    </div>
  );
};