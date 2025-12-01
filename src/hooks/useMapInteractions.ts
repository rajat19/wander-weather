import { useState, useRef } from 'react';
import { getCountriesData, mapCountryCode } from '@/lib/firebaseDataLoader';
import { TooltipData } from '@/components/map/MapTooltip';
import { VisaCategory } from '@/lib/visa';

interface UseMapInteractionsOptions {
  selectedMonth: string;
  visaData?: {
    byPassport: Record<string, Record<string, VisaCategory>>;
    selectedPassportIso3?: string;
    passportCountryName?: string;
    numericToIso3: Record<string, string>;
  };
}

export const useMapInteractions = (options: UseMapInteractionsOptions | string) => {
  // Support both old signature (just month string) and new signature (options object)
  const selectedMonth = typeof options === 'string' ? options : options.selectedMonth;
  const visaData = typeof options === 'string' ? undefined : options.visaData;
  
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
    
    // Get visa requirement if in visa mode
    let visaRequirement: VisaCategory | undefined;
    if (visaData?.selectedPassportIso3) {
      // Try to get ISO3 for the hovered country
      const iso3Prop = mapCountryCode(countryId); // This might not give ISO3, so we need to check
      // For better matching, check if we can get ISO3 from numeric ID
      const numericId = String(countryId);
      const iso3 = visaData.numericToIso3[numericId] || iso3Prop;
      
      if (iso3) {
        const visaMap = visaData.byPassport[visaData.selectedPassportIso3] || {};
        visaRequirement = visaMap[iso3] || 'n/a';
      }
    }
    
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
      // NEW: Pass visa data if available
      visaRequirement,
      passportCountry: visaData?.passportCountryName,
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