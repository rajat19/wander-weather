import { useState, useRef } from 'react';
import { getCountriesData, mapCountryCode } from '@/lib/dataLoader';
import { TooltipData } from '@/components/map/MapTooltip';

export const useMapInteractions = (selectedMonth: string) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const lastCountryId = useRef<string | null>(null);

  const handleCountryHover = (
    event: React.MouseEvent, 
    countryId: string
  ) => {
    const alpha2Code = mapCountryCode(countryId);
    const tourismData = getCountriesData();
    const country = tourismData.find(c => c.code === alpha2Code);
    
    if (!country || !country.monthlyData[selectedMonth]) return;

    // Only update if we're hovering over a different country
    // This prevents unnecessary re-renders and position jumping
    if (lastCountryId.current === countryId) return;
    
    lastCountryId.current = countryId;
    const data = country.monthlyData[selectedMonth];
    
    // Get the map container position to calculate relative coordinates
    const mapContainer = event.currentTarget.closest('.relative');
    const containerRect = mapContainer?.getBoundingClientRect();
    
    const relativeX = containerRect ? event.clientX - containerRect.left : event.clientX;
    const relativeY = containerRect ? event.clientY - containerRect.top : event.clientY;
    
            setTooltip({
          country: country.name,
          avgDayTemp: data.avgDayTemp,
          avgNightTemp: data.avgNightTemp,
          rainfall: data.rainfall,
          description: data.description || '',
          bestTime: data.bestTime,
          x: relativeX,
          y: relativeY,
          // NEW: Pass regional data if available
          regions: country.regions,
          selectedMonth: selectedMonth,
        });
  };

  const handleCountryLeave = () => {
    setTooltip(null);
    lastCountryId.current = null; // Reset to allow re-entering the same country
  };

  return {
    tooltip,
    handleCountryHover,
    handleCountryLeave,
  };
};