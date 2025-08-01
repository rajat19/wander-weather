import React from 'react';

export interface TooltipData {
  country: string;
  avgDayTemp: number;
  avgNightTemp: number;
  rainfall: number;
  description: string;
  x: number;
  y: number;
}

interface MapTooltipProps {
  tooltip: TooltipData | null;
  maxWidth?: number;
  maxHeight?: number;
}

export const MapTooltip: React.FC<MapTooltipProps> = ({ 
  tooltip, 
  maxWidth = 1000, 
  maxHeight = 600 
}) => {
  if (!tooltip) return null;

  return (
    <div
      className="absolute z-50 p-3 bg-white rounded-lg shadow-xl border transition-all duration-200 pointer-events-none"
      style={{
        left: Math.min(Math.max(tooltip.x - 150, 10), maxWidth), // Keep tooltip within map bounds with padding
        top: Math.min(Math.max(tooltip.y - 10, 10), maxHeight), // Ensure tooltip doesn't go off bottom
        maxWidth: '280px',
      }}
    >
      <h3 className="font-bold text-sm mb-2">{tooltip.country}</h3>
      <div className="space-y-1 text-xs">
        <div>Day: {tooltip.avgDayTemp}°C</div>
        <div>Night: {tooltip.avgNightTemp}°C</div>
        <div>Rainfall: {tooltip.rainfall}mm</div>
        {tooltip.description && (
          <div className="mt-2 text-muted-foreground italic">
            {tooltip.description}
          </div>
        )}
      </div>
    </div>
  );
};