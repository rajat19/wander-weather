import { useState, useRef } from 'react';
import { getCountriesData, mapCountryCode } from '@/lib/firebaseDataLoader';
import { TooltipData } from '@/components/map/MapTooltip';

export const useMapInteractions = (selectedMonth: string) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const lastCountryId = useRef<string | null>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCountryHover = (
    event: React.MouseEvent | React.TouchEvent, 
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
    
    // Handle both mouse and touch events
    let clientX: number, clientY: number;
    if ('touches' in event) {
      // Touch event
      const touch = event.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      // Mouse event
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    const relativeX = containerRect ? clientX - containerRect.left : clientX;
    const relativeY = containerRect ? clientY - containerRect.top : clientY;
    
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
    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    
    setTooltip(null);
    lastCountryId.current = null; // Reset to allow re-entering the same country
  };

  const handleTouchStart = (event: React.TouchEvent, countryId: string) => {
    event.preventDefault();
    handleCountryHover(event, countryId);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    event.preventDefault();
    // Add a small delay for touch events to allow for better UX
    touchTimeoutRef.current = setTimeout(() => {
      handleCountryLeave();
    }, 150);
  };

  return {
    tooltip,
    handleCountryHover,
    handleCountryLeave,
    handleTouchStart,
    handleTouchEnd,
  };
};