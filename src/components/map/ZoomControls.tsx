import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Minimize } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  currentZoom: number;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleFullscreen,
  isFullscreen,
  currentZoom,
}) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
      <button
        onClick={onZoomIn}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentZoom >= 8}
        title="Zoom In"
      >
        <ZoomIn size={18} />
      </button>
      
      <button
        onClick={onZoomOut}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentZoom <= 1.01}
        title="Zoom Out"
      >
        <ZoomOut size={18} />
      </button>
      
      <div className="border-t border-gray-300 mx-1"></div>
      
      <button
        onClick={onReset}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
        title="Reset Zoom"
      >
        <RotateCcw size={18} />
      </button>
      
      <div className="border-t border-gray-300 mx-1"></div>
      
      <button
        onClick={onToggleFullscreen}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
      </button>
      
      {/* Zoom level indicator */}
      <div className="text-xs text-center text-gray-600 font-mono px-1">
        {Math.round(currentZoom * 100)}%
      </div>
    </div>
  );
};