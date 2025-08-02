import React from 'react';
import { getWeatherCondition, getRainfallLevel, getTemperatureFeeling } from '@/lib/weatherUtils';

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

  const weather = getWeatherCondition(
    tooltip.avgDayTemp, 
    tooltip.avgNightTemp, 
    tooltip.rainfall
  );

  const rainfallLevel = getRainfallLevel(tooltip.rainfall);
  const dayFeeling = getTemperatureFeeling(tooltip.avgDayTemp);
  const nightFeeling = getTemperatureFeeling(tooltip.avgNightTemp);

  // Calculate stable positioning to prevent jumping
  const tooltipHeight = 240; // Approximate tooltip height
  const tooltipWidth = 320;
  
  // Check if tooltip would be in bottom half of map
  const isBottomHalf = tooltip.y > maxHeight * 0.4;
  
  // Calculate positioning with better logic
  const leftPos = Math.min(Math.max(tooltip.x - tooltipWidth / 2, 15), maxWidth - tooltipWidth - 15);
  const topPos = isBottomHalf 
    ? Math.max(tooltip.y - tooltipHeight - 30, 15) // Position above for bottom countries
    : Math.min(tooltip.y + 20, maxHeight - tooltipHeight - 15); // Position below for top countries

  return (
    <div
      className={`absolute z-50 rounded-xl shadow-2xl border-2 transition-all duration-200 pointer-events-none ${weather.bgColor} ${weather.textColor} ${weather.borderColor}`}
      style={{
        left: leftPos,
        top: topPos,
        maxWidth: `${tooltipWidth}px`,
        transform: 'translateZ(0)', // Force hardware acceleration for smoother rendering
      }}
    >
      {/* Header with weather icon */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">{tooltip.country}</h3>
          <div className="text-3xl">{weather.emoji}</div>
        </div>
        
        {/* Weather condition banner */}
        <div className="text-center mb-3">
          <div className="text-sm font-medium opacity-90">{weather.icon} {tooltip.description}</div>
        </div>
      </div>

      {/* Weather details */}
      <div className="px-4 pb-4 space-y-3">
        {/* Temperature section */}
        <div className="bg-black bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-80">🌡️ Temperature</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-center">
              <div className="text-md font-bold">🌅 {tooltip.avgDayTemp}°C</div>
              <div className="text-xs opacity-75">{dayFeeling}</div>
            </div>
            <div className="text-center">
              <div className="text-md font-bold">🌙 {tooltip.avgNightTemp}°C</div>
              <div className="text-xs opacity-75">{nightFeeling}</div>
            </div>
          </div>
        </div>

        {/* Rainfall section */}
        <div className="bg-black bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-80">💧 Precipitation</span>
          </div>
          <div className="text-center">
            <div className="text-md font-bold">{tooltip.rainfall}mm</div>
            <div className="text-xs opacity-75">{rainfallLevel} rainfall</div>
          </div>
        </div>
      </div>


    </div>
  );
};