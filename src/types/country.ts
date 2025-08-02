export interface RegionalData {
    name: string;
    description: string;
    coordinates?: [number, number]; // Optional center point for region
    monthlyData: {
      [month: string]: MonthData;
    };
}
  
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
        [month: string]: MonthData;
    };
    // Regional subdivisions for large countries with climate variations
    regions?: RegionalData[];
}

export interface MonthData {
    avgDayTemp: number; // Celsius
    avgNightTemp: number; // Celsius
    rainfall: number; // mm
    description?: string;
    bestTime: 'best' | 'okay' | 'avoid'; // Best time to visit rating
}