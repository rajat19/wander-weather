import { useState } from 'react';
import { getCountriesData, mapCountryCode } from '@/data/tourismDataLoader';
import { TooltipData } from '@/components/map/MapTooltip';

export const useMapInteractions = (selectedMonth: string) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const handleCountryHover = (
    event: React.MouseEvent, 
    countryId: string
  ) => {
    const alpha2Code = mapCountryCode(countryId);
    const tourismData = getCountriesData();
    const country = tourismData.find(c => c.code === alpha2Code);
    
    if (!country || !country.monthlyData[selectedMonth]) return;

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
      x: relativeX,
      y: relativeY - 10,
    });
  };

  const handleCountryLeave = () => {
    setTooltip(null);
  };

  return {
    tooltip,
    handleCountryHover,
    handleCountryLeave,
  };
};