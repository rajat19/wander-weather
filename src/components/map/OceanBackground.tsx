import React from 'react';
import { MAP_DIMENSIONS } from '@/lib/mapProjection';

export const OceanBackground: React.FC = () => {
  return (
    <>
      {/* Define gradients */}
      <defs>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(200, 80%, 82%)" />
          <stop offset="50%" stopColor="hsl(205, 85%, 78%)" />
          <stop offset="100%" stopColor="hsl(210, 80%, 76%)" />
        </linearGradient>
      </defs>
      
      {/* Ocean background */}
      <rect 
        width={MAP_DIMENSIONS.width} 
        height={MAP_DIMENSIONS.height} 
        fill="url(#oceanGradient)" 
      />
    </>
  );
};