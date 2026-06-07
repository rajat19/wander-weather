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
      className={`absolute z-50 rounded-xl shadow-2xl border-2 transition-all duration-200 pointer-events-none max-w-[210px] sm:max-w-[320px] w-max sm:w-auto ${
        isVisaMode && tooltip.visaRequirement
          ? `${getVisaBgColor(tooltip.visaRequirement)} ${getVisaTextColor()} ${getVisaBorderColor(tooltip.visaRequirement)}`
          : `${weather.bgColor} ${weather.textColor} ${weather.borderColor}`
      }`}
      style={{
        left: leftPos,
        top: topPos,
        transform: 'translateZ(0)', // Force hardware acceleration for smoother rendering
      }}
    >
      {/* Header */}
      <div className="p-2 sm:p-4 pb-1.5 sm:pb-2">
        <div className="flex items-center justify-between mb-1.5 sm:mb-3 gap-2">
          <h3 className="font-bold text-[13px] sm:text-sm leading-tight">{tooltip.country}</h3>
          {!isVisaMode && (
            <div className='justify-end items-center flex gap-1 sm:gap-2 shrink-0'>
              <div className="text-[13px] sm:text-md">{weather.emoji}</div>
              <div className={`text-[13px] sm:text-md font-bold ${
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
          <div className="text-center mb-1.5 sm:mb-3 bg-black bg-opacity-20 rounded-md p-1.5 sm:p-2">
            <div className="text-[11px] sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-2">
              <span>{getVisaEmoji(tooltip.visaRequirement)}</span>
              <span>{getVisaText(tooltip.visaRequirement)}</span>
            </div>
            <div className="text-[10px] sm:text-xs opacity-90 mt-0.5 sm:mt-1">
              for {tooltip.passportCountry} passport
            </div>
          </div>
        )}
        
        {/* Weather condition banner (only if not visa mode) */}
        {!isVisaMode && (
          <div className="text-center mb-1.5 sm:mb-3">
            <div className="text-[11px] sm:text-xs font-medium opacity-90 leading-tight">
              {weather.icon} <span className="hidden sm:inline">{tooltip.description}</span>
              <span className="sm:hidden">{tooltip.description.replace(/ in .*/, '')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Weather details - ONLY show if not in visa mode */}
      {!isVisaMode && (
        <div className="px-2 sm:px-4 pb-2 sm:pb-4 space-y-1.5 sm:space-y-3">
          <div className='flex flex-col sm:grid sm:grid-cols-2 gap-1.5 sm:gap-2'>
            {/* Temperature section */}
            <div className="bg-black bg-opacity-20 rounded-md p-1.5 sm:p-3 flex sm:block items-center justify-between">
              <div className="flex items-center sm:mb-2">
                <span className="text-[10px] sm:text-xs font-medium opacity-80">
                  🌡️ <span className="hidden sm:inline">Temperature</span><span className="sm:hidden">Temp</span>
                </span>
              </div>
              <div className="flex sm:grid sm:grid-cols-2 gap-2 sm:gap-2 text-[11px] sm:text-sm">
                <div className="text-center flex items-center gap-1 sm:block">
                  <div className="font-bold">🌅 {tooltip.avgDayTemp}°C</div>
                  <div className="opacity-75 hidden sm:block text-xs">{dayFeeling}</div>
                </div>
                <div className="text-center flex items-center gap-1 sm:block">
                  <div className="font-bold">🌙 {tooltip.avgNightTemp}°C</div>
                  <div className="opacity-75 hidden sm:block text-xs">{nightFeeling}</div>
                </div>
              </div>
            </div>

            {/* Rainfall section */}
            <div className="bg-black bg-opacity-20 rounded-md p-1.5 sm:p-3 flex sm:block items-center justify-between">
              <div className="flex items-center sm:mb-2">
                <span className="text-[10px] sm:text-xs font-medium opacity-80">
                  💧 <span className="hidden sm:inline">Precipitation</span><span className="sm:hidden">Rain</span>
                </span>
              </div>
              <div className="text-right sm:text-center">
                <div className="text-[11px] sm:text-xs font-bold">{tooltip.rainfall}mm</div>
                <div className="text-[10px] sm:text-xs opacity-75 hidden sm:block">{rainfallLevel} rainfall</div>
              </div>
            </div>
          </div>

          {/* Regional variations for large countries */}
          {tooltip.regions && tooltip.selectedMonth && (
            <div className="bg-black bg-opacity-20 rounded-md p-1.5 sm:p-3">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-[10px] sm:text-xs font-medium opacity-80">🌍 Reg. Variations</span>
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
                    <div key={index} className="flex items-center justify-between text-[10px] sm:text-xs">
                      <div className="flex items-center gap-1">
                        <span className={regionColor}>{regionIcon}</span>
                        <span className="opacity-90">{region.name}</span>
                      </div>
                      <div className="text-right opacity-80 flex gap-1.5 sm:gap-2">
                        <div>{regionData.avgDayTemp}°C</div>
                        <div className="opacity-60">{regionData.rainfall}mm</div>
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