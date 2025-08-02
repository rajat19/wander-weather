import { 
  getCountriesData, 
  DataCategory, 
  getTemperatureColor, 
  getRainfallColor,
  getBestTimeColor,
  mapCountryCode 
} from '@/data/tourismDataLoader';

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
  
  if (selectedCategory === 'temperature') {
    return getTemperatureColor(data.avgDayTemp);
  } else if (selectedCategory === 'rainfall') {
    return getRainfallColor(data.rainfall);
  } else if (selectedCategory === 'bestTime') {
    return getBestTimeColor(data.bestTime);
  } else {
    return 'hsl(0, 0%, 85%)'; // Default gray for unknown category
  }
};

/**
 * Checks if a country has tourism data available
 */
export const hasCountryData = (countryId: string, selectedMonth: string): boolean => {
  const alpha2Code = mapCountryCode(countryId);
  const tourismData = getCountriesData();
  const country = tourismData.find(c => c.code === alpha2Code);
  return !!(country && country.monthlyData[selectedMonth]);
};