import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ARViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const ARView = ({ isOpen, onClose }: ARViewProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full border-white/30 bg-black/50 text-white hover:bg-white/20 backdrop-blur-sm"
      >
        <X className="w-4 h-4" />
      </Button>

      {/* AR Scene */}
      <div 
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: `
            <a-scene
              mindar-image="imageTargetSrc: /assets/targets/xhgd-characters.mind; autoStart: true;"
              color-space="sRGB"
              renderer="colorManagement: true, physicallyCorrectLights"
              vr-mode-ui="enabled: false"
              device-orientation-permission-ui="enabled: false"
            >
              <a-assets>
                <a-asset-item id="guardianBearModel" src="/assets/models/guardian-bear.gltf"></a-asset-item>
                <a-asset-item id="forestFoxModel" src="/assets/models/forest-fox.gltf"></a-asset-item>
              </a-assets>

              <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

              <a-entity mindar-image-target="targetIndex: 0">
                <a-gltf-model 
                  rotation="0 0 0" 
                  position="0 0 0" 
                  scale="0.1 0.1 0.1" 
                  src="#guardianBearModel" 
                  animation-mixer>
                </a-gltf-model>
              </a-entity>

              <a-entity mindar-image-target="targetIndex: 1">
                <a-gltf-model 
                  rotation="0 0 0" 
                  position="0 0 0" 
                  scale="0.1 0.1 0.1" 
                  src="#forestFoxModel" 
                  animation-mixer>
                </a-gltf-model>
              </a-entity>
            </a-scene>
          `
        }}
      />
    </div>
  );
};

export default ARView;