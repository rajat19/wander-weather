import { 
  getCountriesData, 
  DataCategory,
  mapCountryCode 
} from '@/lib/firebaseDataLoader';
import { MonthData } from '@/types';

/**
 * Gets the appropriate color for a country based on the selected category and month
 */
export const getColorForCountry = (
  countryId: string, 
  selectedMonth: string, 
  selectedCategory: DataCategory
): string => {
  // Convert country ID to our format
  const alpha2Code = mapCountryCode(countryId);
  
  const tourismData = getCountriesData();
  const country = tourismData.find(c => c.code === alpha2Code);
  
  if (!country || !country.monthlyData[selectedMonth]) {
    return 'hsl(0, 0%, 85%)'; // Default gray for missing data
  }

  const data = country.monthlyData[selectedMonth];
  return getCategoryColor(selectedCategory, data);
};

// Color functions for temperature and rainfall visualization
export const getTemperatureColor = (temp: number): string => {
  // Temperature color scale from blue (cold) to red (hot)
  if (temp <= 0) return 'hsl(240, 100%, 70%)'; // Very cold - deep blue
  if (temp <= 10) return 'hsl(220, 80%, 60%)'; // Cold - blue
  if (temp <= 20) return 'hsl(180, 60%, 50%)'; // Cool - cyan
  if (temp <= 25) return 'hsl(120, 60%, 50%)'; // Mild - green
  if (temp <= 30) return 'hsl(60, 80%, 50%)'; // Warm - yellow
  if (temp <= 35) return 'hsl(30, 90%, 55%)'; // Hot - orange
  return 'hsl(0, 90%, 60%)'; // Very hot - red
};

export const getRainfallColor = (rainfall: number): string => {
  // Rainfall color scale from light blue (dry) to dark blue (wet)
  if (rainfall <= 10) return 'hsl(45, 70%, 85%)'; // Very dry - light beige
  if (rainfall <= 25) return 'hsl(200, 40%, 80%)'; // Dry - very light blue
  if (rainfall <= 50) return 'hsl(200, 50%, 70%)'; // Low - light blue
  if (rainfall <= 100) return 'hsl(200, 60%, 60%)'; // Moderate - medium blue
  if (rainfall <= 150) return 'hsl(200, 70%, 50%)'; // High - blue
  if (rainfall <= 200) return 'hsl(210, 80%, 40%)'; // Very high - dark blue
  return 'hsl(220, 90%, 30%)'; // Extremely high - very dark blue
};

export const getBestTimeColor = (bestTime: 'best' | 'okay' | 'avoid'): string => {
  // Traffic light system for best time to visit
  switch (bestTime) {
    case 'best': return 'hsl(120, 70%, 50%)'; // Green - Best time to visit
    case 'okay': return 'hsl(45, 80%, 55%)'; // Yellow - Okay time to visit
    case 'avoid': return 'hsl(0, 70%, 55%)'; // Red - Avoid visiting
    default: return 'hsl(0, 0%, 80%)'; // Gray - No data
  }
};

export const getCategoryColor  = (category: DataCategory, monthData: MonthData) => {
  switch (category) {
    case 'temperature': return getTemperatureColor(monthData.avgDayTemp);
    case 'rainfall': return getRainfallColor(monthData.rainfall);
    case 'bestTime': return getBestTimeColor(monthData.bestTime);
    default: return 'hsl(0, 0%, 80%)'; // Gray - No data
  }
} 