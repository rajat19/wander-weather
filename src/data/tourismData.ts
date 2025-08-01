// Tourism data for countries by month
export interface CountryData {
  name: string;
  code: string;
  coordinates: [number, number]; // [lat, lng]
  monthlyData: {
    [month: string]: {
      avgDayTemp: number; // Celsius
      avgNightTemp: number; // Celsius
      rainfall: number; // mm
      description?: string;
    };
  };
}

export const tourismData: CountryData[] = [
  {
    name: "Italy",
    code: "IT",
    coordinates: [41.8719, 12.5674],
    monthlyData: {
      "January": { avgDayTemp: 12, avgNightTemp: 3, rainfall: 65, description: "Cool and wet, fewer crowds" },
      "February": { avgDayTemp: 14, avgNightTemp: 4, rainfall: 55, description: "Mild winter, perfect for cities" },
      "March": { avgDayTemp: 17, avgNightTemp: 7, rainfall: 60, description: "Spring begins, pleasant weather" },
      "April": { avgDayTemp: 21, avgNightTemp: 11, rainfall: 45, description: "Beautiful spring weather" },
      "May": { avgDayTemp: 26, avgNightTemp: 16, rainfall: 35, description: "Perfect weather, blooming season" },
      "June": { avgDayTemp: 30, avgNightTemp: 20, rainfall: 25, description: "Warm and sunny, ideal for travel" },
      "July": { avgDayTemp: 33, avgNightTemp: 23, rainfall: 15, description: "Hot summer, perfect for coast" },
      "August": { avgDayTemp: 33, avgNightTemp: 23, rainfall: 20, description: "Peak summer heat" },
      "September": { avgDayTemp: 28, avgNightTemp: 19, rainfall: 45, description: "Perfect autumn weather" },
      "October": { avgDayTemp: 23, avgNightTemp: 14, rainfall: 70, description: "Mild autumn, harvest season" },
      "November": { avgDayTemp: 17, avgNightTemp: 9, rainfall: 85, description: "Cool and rainy" },
      "December": { avgDayTemp: 13, avgNightTemp: 5, rainfall: 75, description: "Winter begins, Christmas markets" }
    }
  },
  {
    name: "Japan",
    code: "JP",
    coordinates: [36.2048, 138.2529],
    monthlyData: {
      "January": { avgDayTemp: 10, avgNightTemp: 2, rainfall: 55, description: "Cold winter, snow season" },
      "February": { avgDayTemp: 11, avgNightTemp: 2, rainfall: 60, description: "Late winter, plum blossoms" },
      "March": { avgDayTemp: 14, avgNightTemp: 5, rainfall: 120, description: "Spring begins, cherry blossom season starts" },
      "April": { avgDayTemp: 20, avgNightTemp: 10, rainfall: 125, description: "Peak cherry blossom season" },
      "May": { avgDayTemp: 24, avgNightTemp: 15, rainfall: 140, description: "Perfect spring weather" },
      "June": { avgDayTemp: 27, avgNightTemp: 19, rainfall: 165, description: "Rainy season begins" },
      "July": { avgDayTemp: 31, avgNightTemp: 23, rainfall: 155, description: "Hot and humid summer" },
      "August": { avgDayTemp: 32, avgNightTemp: 24, rainfall: 145, description: "Peak summer heat" },
      "September": { avgDayTemp: 28, avgNightTemp: 20, rainfall: 210, description: "Autumn begins, typhoon season" },
      "October": { avgDayTemp: 22, avgNightTemp: 14, rainfall: 165, description: "Beautiful autumn colors" },
      "November": { avgDayTemp: 17, avgNightTemp: 8, rainfall: 90, description: "Perfect autumn weather" },
      "December": { avgDayTemp: 12, avgNightTemp: 4, rainfall: 50, description: "Winter begins, clear skies" }
    }
  },
  {
    name: "Thailand",
    code: "TH",
    coordinates: [15.8700, 100.9925],
    monthlyData: {
      "January": { avgDayTemp: 32, avgNightTemp: 21, rainfall: 10, description: "Cool and dry, peak tourist season" },
      "February": { avgDayTemp: 35, avgNightTemp: 24, rainfall: 15, description: "Hot and dry, excellent weather" },
      "March": { avgDayTemp: 37, avgNightTemp: 26, rainfall: 25, description: "Very hot, dry season continues" },
      "April": { avgDayTemp: 38, avgNightTemp: 27, rainfall: 60, description: "Hottest month, occasional showers" },
      "May": { avgDayTemp: 36, avgNightTemp: 26, rainfall: 120, description: "Rainy season begins" },
      "June": { avgDayTemp: 34, avgNightTemp: 25, rainfall: 90, description: "Wet season, frequent rains" },
      "July": { avgDayTemp: 33, avgNightTemp: 25, rainfall: 90, description: "Monsoon season" },
      "August": { avgDayTemp: 33, avgNightTemp: 25, rainfall: 100, description: "Peak rainy season" },
      "September": { avgDayTemp: 33, avgNightTemp: 24, rainfall: 160, description: "Heavy rains, flooding possible" },
      "October": { avgDayTemp: 32, avgNightTemp: 23, rainfall: 110, description: "Late monsoon, rains decreasing" },
      "November": { avgDayTemp: 31, avgNightTemp: 22, rainfall: 35, description: "Cool season begins, perfect weather" },
      "December": { avgDayTemp: 30, avgNightTemp: 20, rainfall: 5, description: "Cool and dry, ideal conditions" }
    }
  },
  {
    name: "Australia",
    code: "AU",
    coordinates: [-25.2744, 133.7751],
    monthlyData: {
      "January": { avgDayTemp: 35, avgNightTemp: 22, rainfall: 65, description: "Hot summer, peak tourist season" },
      "February": { avgDayTemp: 34, avgNightTemp: 22, rainfall: 70, description: "Late summer, warm weather" },
      "March": { avgDayTemp: 31, avgNightTemp: 19, rainfall: 55, description: "Autumn begins, pleasant weather" },
      "April": { avgDayTemp: 27, avgNightTemp: 15, rainfall: 45, description: "Perfect autumn weather" },
      "May": { avgDayTemp: 23, avgNightTemp: 11, rainfall: 50, description: "Mild autumn, comfortable temperatures" },
      "June": { avgDayTemp: 20, avgNightTemp: 8, rainfall: 65, description: "Winter begins, cool and wet" },
      "July": { avgDayTemp: 19, avgNightTemp: 7, rainfall: 70, description: "Winter peak, cool weather" },
      "August": { avgDayTemp: 21, avgNightTemp: 8, rainfall: 65, description: "Late winter, spring approaching" },
      "September": { avgDayTemp: 24, avgNightTemp: 11, rainfall: 55, description: "Spring begins, wildflower season" },
      "October": { avgDayTemp: 28, avgNightTemp: 15, rainfall: 50, description: "Beautiful spring weather" },
      "November": { avgDayTemp: 31, avgNightTemp: 18, rainfall: 55, description: "Warm spring, perfect for travel" },
      "December": { avgDayTemp: 34, avgNightTemp: 21, rainfall: 60, description: "Summer begins, hot weather returns" }
    }
  },
  {
    name: "Iceland",
    code: "IS",
    coordinates: [64.9631, -19.0208],
    monthlyData: {
      "January": { avgDayTemp: 2, avgNightTemp: -3, rainfall: 75, description: "Dark winter, Northern Lights season" },
      "February": { avgDayTemp: 3, avgNightTemp: -2, rainfall: 65, description: "Late winter, longer days begin" },
      "March": { avgDayTemp: 4, avgNightTemp: -1, rainfall: 70, description: "Spring begins, equinox approaching" },
      "April": { avgDayTemp: 7, avgNightTemp: 2, rainfall: 55, description: "Cool spring, lupine flowers bloom" },
      "May": { avgDayTemp: 11, avgNightTemp: 6, rainfall: 45, description: "Pleasant spring, white nights begin" },
      "June": { avgDayTemp: 14, avgNightTemp: 9, rainfall: 40, description: "Peak summer, midnight sun" },
      "July": { avgDayTemp: 16, avgNightTemp: 11, rainfall: 50, description: "Warmest month, lupine season" },
      "August": { avgDayTemp: 15, avgNightTemp: 10, rainfall: 60, description: "Late summer, still warm" },
      "September": { avgDayTemp: 12, avgNightTemp: 7, rainfall: 70, description: "Autumn begins, Northern Lights return" },
      "October": { avgDayTemp: 8, avgNightTemp: 3, rainfall: 85, description: "Cool autumn, aurora season" },
      "November": { avgDayTemp: 4, avgNightTemp: 0, rainfall: 75, description: "Winter approaches, dark season begins" },
      "December": { avgDayTemp: 2, avgNightTemp: -2, rainfall: 80, description: "Dark winter, Northern Lights peak" }
    }
  },
  {
    name: "Brazil",
    code: "BR",
    coordinates: [-14.2350, -51.9253],
    monthlyData: {
      "January": { avgDayTemp: 32, avgNightTemp: 23, rainfall: 180, description: "Hot summer, rainy season" },
      "February": { avgDayTemp: 32, avgNightTemp: 23, rainfall: 160, description: "Peak summer heat, Carnival season" },
      "March": { avgDayTemp: 31, avgNightTemp: 22, rainfall: 140, description: "Late summer, rains continue" },
      "April": { avgDayTemp: 29, avgNightTemp: 20, rainfall: 90, description: "Autumn begins, less rain" },
      "May": { avgDayTemp: 27, avgNightTemp: 17, rainfall: 50, description: "Dry season begins, pleasant weather" },
      "June": { avgDayTemp: 26, avgNightTemp: 15, rainfall: 25, description: "Winter begins, dry and mild" },
      "July": { avgDayTemp: 26, avgNightTemp: 15, rainfall: 20, description: "Cool winter, dry season" },
      "August": { avgDayTemp: 28, avgNightTemp: 17, rainfall: 25, description: "Late winter, warming begins" },
      "September": { avgDayTemp: 30, avgNightTemp: 19, rainfall: 45, description: "Spring begins, dry weather continues" },
      "October": { avgDayTemp: 31, avgNightTemp: 21, rainfall: 100, description: "Warm spring, rains return" },
      "November": { avgDayTemp: 31, avgNightTemp: 22, rainfall: 140, description: "Late spring, rainy season starts" },
      "December": { avgDayTemp: 32, avgNightTemp: 23, rainfall: 170, description: "Summer begins, heavy rains" }
    }
  }
];

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export type DataCategory = 'temperature' | 'rainfall';

export const getTemperatureColor = (temp: number): string => {
  // Temperature color mapping (Celsius)
  if (temp >= 35) return 'hsl(0, 100%, 70%)'; // Very hot - red
  if (temp >= 30) return 'hsl(15, 100%, 65%)'; // Hot - orange-red
  if (temp >= 25) return 'hsl(45, 100%, 75%)'; // Warm - orange
  if (temp >= 20) return 'hsl(120, 50%, 75%)'; // Mild - light green
  if (temp >= 15) return 'hsl(180, 70%, 80%)'; // Cool - light blue
  if (temp >= 10) return 'hsl(220, 100%, 70%)'; // Cold - blue
  return 'hsl(240, 100%, 80%)'; // Very cold - dark blue
};

export const getRainfallColor = (rainfall: number): string => {
  // Rainfall color mapping (mm)
  if (rainfall >= 150) return 'hsl(210, 100%, 25%)'; // Very high - dark blue
  if (rainfall >= 100) return 'hsl(200, 100%, 50%)'; // High - blue
  if (rainfall >= 60) return 'hsl(190, 80%, 65%)'; // Medium - light blue
  if (rainfall >= 30) return 'hsl(0, 0%, 75%)'; // Low - light gray
  return 'hsl(0, 0%, 90%)'; // Very low - very light gray
};