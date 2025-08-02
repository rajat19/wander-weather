// Tourism data loader with type safety
export interface CountryData {
  name: string;
  code: string; // ISO Alpha-2 code
  coordinates: [number, number]; // [lat, lng]
  // Alternative country identifiers for mapping
  alternativeCodes?: {
    alpha3?: string; // ISO Alpha-3 code
    numeric?: string; // ISO numeric code  
    commonNames?: string[]; // Common alternative names
  };
  monthlyData: {
    [month: string]: {
      avgDayTemp: number; // Celsius
      avgNightTemp: number; // Celsius
      rainfall: number; // mm
      description?: string;
    };
  };
}

export type DataCategory = 'temperature' | 'rainfall';

// Cache for loaded data
let cachedData: CountryData[] | null = null;

// Load tourism data from JSON
export const loadCountries = async (): Promise<CountryData[]> => {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch('/data/countries.json');
    if (!response.ok) {
      throw new Error(`Failed to load tourism data: ${response.status}`);
    }
    
    const countries: CountryData[] = await response.json();
    
    // Validate the data structure
    if (!Array.isArray(countries)) {
      throw new Error('Invalid tourism data format: missing countries array');
    }

    // Cache the data
    cachedData = countries;
    
    return countries;
  } catch (error) {
    console.error('Error loading tourism data:', error);
    // Return empty array as fallback
    return [];
  }
};

// Load months array
export const loadMonths = async (): Promise<string[]> => {
  return [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
};

// Synchronous access to cached data (for compatibility)
export const getCountriesData = (): CountryData[] => {
  if (!cachedData) {
    console.warn('Countries data not loaded yet. Call loadCountries() first.');
    return [];
  }
  return cachedData;
};

export const getMonths = (): string[] => {
    return [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
};

// Helper functions for country code mapping (moved from old tourismData.ts)
export const mapCountryCode = (countryId: string | undefined): string => {
  if (!countryId) return '';
  
  const tourismData = getCountriesData();
  
  // Create a map from all alternative codes to main country codes
  const codeMap: Record<string, string> = {};
  
  tourismData.forEach(country => {
    // Map the main code to itself
    codeMap[country.code] = country.code;
    codeMap[country.name.toUpperCase()] = country.code;
    
    // Map alternative codes
    if (country.alternativeCodes) {
      if (country.alternativeCodes.alpha3) {
        codeMap[country.alternativeCodes.alpha3] = country.code;
      }
      if (country.alternativeCodes.numeric) {
        codeMap[country.alternativeCodes.numeric] = country.code;
      }
      if (country.alternativeCodes.commonNames) {
        country.alternativeCodes.commonNames.forEach(name => {
          codeMap[name.toUpperCase()] = country.code;
        });
      }
    }
  });
  
  return codeMap[countryId] || countryId;
};

export const hasTourismData = (countryId: string | undefined): boolean => {
  if (!countryId) return false;
  const mappedCode = mapCountryCode(countryId);
  const tourismData = getCountriesData();
  return tourismData.some(country => country.code === mappedCode);
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