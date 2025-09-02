import { useState } from "react";
import { Camera, Download, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoBoothViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhotoBoothView = ({ isOpen, onClose }: PhotoBoothViewProps) => {
  const [currentView, setCurrentView] = useState<'upload' | 'display'>('upload');

  if (!isOpen) return null;

  const handlePhotoUpload = () => {
    // Simulate photo upload and switch to display view
    setCurrentView('display');
  };

  const handleTryAnother = () => {
    setCurrentView('upload');
  };

  const polaroidImages = [
    '/src/assets/floating-bear.png',
    '/src/assets/forest-owl.png', 
    '/src/assets/guardian-bear.png',
    '/src/assets/floating-elephant.png',
    '/src/assets/moonlight-dragon.png',
    '/src/assets/sky-whale.png'
  ];

  const polaroidRotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1'];

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-hidden">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground"
      >
        <X size={24} />
      </Button>

      {currentView === 'upload' ? (
        // Upload Screen
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
              魔法时光照相馆
            </h1>
            <p className="text-lg text-muted-foreground">
              Magic Time Photo Booth
            </p>
          </div>

          {/* Polaroid Upload Frame */}
          <div className="relative mb-8">
            <div className="w-80 h-96 bg-card border-8 border-white shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-3/4 bg-muted border-b-2 border-gray-300 flex flex-col items-center justify-center">
                <Camera size={48} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium">上传照片</p>
                <p className="text-sm text-muted-foreground mt-2">Upload Photo</p>
              </div>
              <div className="h-1/4 flex items-center justify-center">
                <Button 
                  onClick={handlePhotoUpload}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2"
                >
                  点击开始
                </Button>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground max-w-md">
            点击拍立得开始您的魔法时光之旅
            <br />
            <span className="text-sm">Click the polaroid to start your magical journey through time</span>
          </p>
        </div>
      ) : (
        // Display Screen with Polaroid Gallery
        <div className="min-h-screen p-6 flex flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              时光相册
            </h2>
            <p className="text-muted-foreground">Your Time Journey Album</p>
          </div>

          {/* Scattered Polaroids */}
          <div className="relative w-full max-w-6xl h-96 mb-12">
            {polaroidImages.map((image, index) => (
              <div
                key={index}
                className={`absolute w-32 h-40 md:w-40 md:h-48 bg-white shadow-xl ${polaroidRotations[index]} hover:scale-105 hover:rotate-0 transition-all duration-300 cursor-pointer`}
                style={{
                  left: `${15 + (index * 13)}%`,
                  top: `${index % 2 === 0 ? '10%' : '50%'}`,
                  zIndex: index + 1
                }}
              >
                <div className="w-full h-3/4 bg-muted overflow-hidden">
                  <img 
                    src={image}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-1/4 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground font-medium">
                    {['1950s', '1960s', '1970s', '1980s', '1990s', '2000s'][index]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Button 
              variant="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
            >
              <Download size={20} className="mr-2" />
              下载相册 Download Album
            </Button>
            <Button 
              variant="outline"
              onClick={handleTryAnother}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3"
            >
              <RotateCcw size={20} className="mr-2" />
              换张照片 Try Another Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoBoothView;