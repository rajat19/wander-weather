import React from 'react';
import { getWeatherCondition, getRainfallLevel, getTemperatureFeeling } from '@/lib/weatherUtils';
import { RegionalData } from '@/types';
import { VisaCategory } from '@/lib/visa';

export interface TooltipData {
  country: string;
  avgDayTemp: number;
  avgNightTemp: number;
  rainfall: number;
  description: string;
  bestTime: 'best' | 'okay' | 'avoid';
  x: number;
  y: number;
  // NEW: Regional data for large countries
  regions?: RegionalData[];
  selectedMonth?: string;
  // NEW: Visa information
  visaRequirement?: VisaCategory;
  passportCountry?: string;
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

  const isVisaMode = !!tooltip.visaRequirement;

  const weather = getWeatherCondition(
    tooltip.avgDayTemp, 
    tooltip.avgNightTemp, 
    tooltip.rainfall
  );

  const rainfallLevel = getRainfallLevel(tooltip.rainfall);
  const dayFeeling = getTemperatureFeeling(tooltip.avgDayTemp);
  const nightFeeling = getTemperatureFeeling(tooltip.avgNightTemp);

  // Visa-specific colors
  const getVisaBgColor = (requirement: VisaCategory): string => {
    switch (requirement) {
      case 'free': return 'bg-green-600';
      case 'voa': return 'bg-orange-500';
      case 'evisa': return 'bg-blue-600';
      case 'sticker': return 'bg-red-600';
      case 'none': return 'bg-gray-700';
      default: return 'bg-gray-500';
    }
  };

  const getVisaTextColor = (): string => 'text-white';
  const getVisaBorderColor = (requirement: VisaCategory): string => {
    switch (requirement) {
      case 'free': return 'border-green-400';
      case 'voa': return 'border-orange-400';
      case 'evisa': return 'border-blue-400';
      case 'sticker': return 'border-red-400';
      case 'none': return 'border-gray-500';
      default: return 'border-gray-400';
    }
  };

  // Format visa requirement text
  const getVisaText = (requirement: VisaCategory): string => {
    switch (requirement) {
      case 'free': return 'Visa-free';
      case 'voa': return 'Visa on arrival';
      case 'evisa': return 'eVisa required';
      case 'sticker': return 'Visa required';
      case 'none': return 'No admission';
      case 'n/a': return 'No visa data';
      default: return 'Check requirements';
    }
  };

  const getVisaEmoji = (requirement: VisaCategory): string => {
    switch (requirement) {
      case 'free': return '✅';
      case 'voa': return '🛬';
      case 'evisa': return '💻';
      case 'sticker': return '📋';
      case 'none': return '❌';
      default: return '❓';
    }
  };

  // Calculate stable positioning to prevent jumping
  const tooltipHeight = 240; // Approximate tooltip height
  const tooltipWidth = 320;
  
  // Check if tooltip would be in bottom half of map
  const isBottomHalf = tooltip.y > maxHeight * 0.3;
  
  // Calculate positioning with better logic and mobile considerations
  const leftPos = Math.min(Math.max(tooltip.x - tooltipWidth / 2, 15), maxWidth - tooltipWidth - 15);
  const topPos = isBottomHalf 
    ? Math.max(tooltip.y - tooltipHeight - 30, 15) // Position above for bottom countries
    : Math.min(tooltip.y + 20, maxHeight - tooltipHeight - 15); // Position below for top countries

  return (
    <div
      className={`absolute z-50 rounded-xl shadow-2xl border-2 transition-all duration-200 pointer-events-none max-w-[280px] sm:max-w-[320px] ${
        isVisaMode && tooltip.visaRequirement
          ? `${getVisaBgColor(tooltip.visaRequirement)} ${getVisaTextColor()} ${getVisaBorderColor(tooltip.visaRequirement)}`
          : `${weather.bgColor} ${weather.textColor} ${weather.borderColor}`
      }`}
      style={{
        left: leftPos,
        top: topPos,
        maxWidth: `${tooltipWidth}px`,
        transform: 'translateZ(0)', // Force hardware acceleration for smoother rendering
      }}
    >
      {/* Header */}
      <div className="p-3 sm:p-4 pb-2">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="font-bold text-xs sm:text-sm">{tooltip.country}</h3>
          {!isVisaMode && (
            <div className='justify-end items-center flex gap-1 sm:gap-2'>
              <div className="text-sm sm:text-md">{weather.emoji}</div>
              <div className={`text-sm sm:text-md font-bold ${
                  tooltip.bestTime === 'best' ? 'text-green-300' :
                  tooltip.bestTime === 'okay' ? 'text-yellow-300' : 'text-red-300'
                }`}>
                  {tooltip.bestTime === 'best' ? '✅' :
                    tooltip.bestTime === 'okay' ? '⚠️' : '❌'}
                </div>
            </div>
          )}
        </div>
        
        {/* Visa requirement info (if in visa mode) */}
        {tooltip.visaRequirement && tooltip.passportCountry && (
          <div className="text-center mb-2 sm:mb-3 bg-black bg-opacity-20 rounded-md p-2">
            <div className="text-sm font-bold flex items-center justify-center gap-2">
              <span>{getVisaEmoji(tooltip.visaRequirement)}</span>
              <span>{getVisaText(tooltip.visaRequirement)}</span>
            </div>
            <div className="text-xs opacity-90 mt-1">
              for {tooltip.passportCountry} passport
            </div>
          </div>
        )}
        
        {/* Weather condition banner (only if not visa mode) */}
        {!isVisaMode && (
          <div className="text-center mb-2 sm:mb-3">
            <div className="text-xs font-medium opacity-90">{weather.icon} {tooltip.description}</div>
          </div>
        )}
      </div>

      {/* Weather details - ONLY show if not in visa mode */}
      {!isVisaMode && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3">
          <div className='grid grid-cols-2 gap-2'>
            {/* Temperature section */}
            <div className="bg-black bg-opacity-20 rounded-md p-2 sm:p-3">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-xs font-medium opacity-80">🌡️ Temperature</span>
              </div>
              <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
                <div className="text-center">
                  <div className="text-xs font-bold">🌅 {tooltip.avgDayTemp}°C</div>
                  <div className="text-xs opacity-75">{dayFeeling}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold">🌙 {tooltip.avgNightTemp}°C</div>
                  <div className="text-xs opacity-75">{nightFeeling}</div>
                </div>
              </div>
            </div>

            {/* Rainfall section */}
            <div className="bg-black bg-opacity-20 rounded-lg p-2 sm:p-3">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-xs font-medium opacity-80">💧 Precipitation</span>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold">{tooltip.rainfall}mm</div>
                <div className="text-xs opacity-75">{rainfallLevel} rainfall</div>
              </div>
            </div>
          </div>

          {/* Regional variations for large countries */}
          {tooltip.regions && tooltip.selectedMonth && (
            <div className="bg-black bg-opacity-20 rounded-lg p-2 sm:p-3">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-xs font-medium opacity-80">🌍 Regional Variations</span>
              </div>
              <div className="space-y-1 sm:space-y-2">
                {tooltip.regions.map((region, index) => {
                  const regionData = region.monthlyData[tooltip.selectedMonth!];
                  if (!regionData) return null;
                  
                  const regionIcon = regionData.bestTime === 'best' ? '✅' :
                                    regionData.bestTime === 'okay' ? '⚠️' : '❌';
                  const regionColor = regionData.bestTime === 'best' ? 'text-green-300' :
                                      regionData.bestTime === 'okay' ? 'text-yellow-300' : 'text-red-300';
                  
                  return (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <span className={regionColor}>{regionIcon}</span>
                        <span className="opacity-90">{region.name}</span>
                      </div>
                      <div className="text-right opacity-80 flex gap-1 sm:gap-2">
                        <div>{regionData.avgDayTemp}°C</div>
                        <div className="text-xs opacity-60">{regionData.rainfall}mm</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};