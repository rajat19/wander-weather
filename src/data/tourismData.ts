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
  },
  {
    name: "France",
    code: "FR",
    coordinates: [46.2276, 2.2137],
    monthlyData: {
      "January": { avgDayTemp: 7, avgNightTemp: 2, rainfall: 51, description: "Cold winter, fewer tourists" },
      "February": { avgDayTemp: 9, avgNightTemp: 3, rainfall: 41, description: "Late winter, mild temperatures" },
      "March": { avgDayTemp: 13, avgNightTemp: 6, rainfall: 48, description: "Spring begins, pleasant weather" },
      "April": { avgDayTemp: 16, avgNightTemp: 8, rainfall: 53, description: "Beautiful spring, perfect for sightseeing" },
      "May": { avgDayTemp: 20, avgNightTemp: 12, rainfall: 62, description: "Ideal weather, blooming season" },
      "June": { avgDayTemp: 24, avgNightTemp: 15, rainfall: 58, description: "Perfect summer weather" },
      "July": { avgDayTemp: 26, avgNightTemp: 17, rainfall: 63, description: "Peak summer, festival season" },
      "August": { avgDayTemp: 26, avgNightTemp: 17, rainfall: 55, description: "Warm summer, vacation time" },
      "September": { avgDayTemp: 22, avgNightTemp: 14, rainfall: 55, description: "Perfect autumn weather" },
      "October": { avgDayTemp: 17, avgNightTemp: 10, rainfall: 59, description: "Mild autumn, harvest season" },
      "November": { avgDayTemp: 11, avgNightTemp: 6, rainfall: 57, description: "Cool autumn, fewer crowds" },
      "December": { avgDayTemp: 8, avgNightTemp: 3, rainfall: 58, description: "Winter begins, Christmas markets" }
    }
  },
  {
    name: "Spain",
    code: "ES",
    coordinates: [40.4637, -3.7492],
    monthlyData: {
      "January": { avgDayTemp: 10, avgNightTemp: 2, rainfall: 37, description: "Mild winter, good for cities" },
      "February": { avgDayTemp: 12, avgNightTemp: 3, rainfall: 35, description: "Late winter, almond blossoms" },
      "March": { avgDayTemp: 16, avgNightTemp: 6, rainfall: 26, description: "Spring begins, perfect weather" },
      "April": { avgDayTemp: 18, avgNightTemp: 8, rainfall: 47, description: "Beautiful spring, ideal conditions" },
      "May": { avgDayTemp: 23, avgNightTemp: 12, rainfall: 35, description: "Perfect weather, festival season" },
      "June": { avgDayTemp: 28, avgNightTemp: 17, rainfall: 25, description: "Hot and dry, great for beaches" },
      "July": { avgDayTemp: 31, avgNightTemp: 19, rainfall: 15, description: "Very hot, peak summer" },
      "August": { avgDayTemp: 31, avgNightTemp: 19, rainfall: 20, description: "Hottest month, vacation time" },
      "September": { avgDayTemp: 26, avgNightTemp: 15, rainfall: 42, description: "Perfect autumn weather" },
      "October": { avgDayTemp: 20, avgNightTemp: 10, rainfall: 54, description: "Mild autumn, ideal conditions" },
      "November": { avgDayTemp: 14, avgNightTemp: 6, rainfall: 46, description: "Cool autumn, good for touring" },
      "December": { avgDayTemp: 10, avgNightTemp: 3, rainfall: 47, description: "Mild winter, Christmas season" }
    }
  },
  {
    name: "Greece",
    code: "GR",
    coordinates: [39.0742, 21.8243],
    monthlyData: {
      "January": { avgDayTemp: 13, avgNightTemp: 6, rainfall: 45, description: "Mild winter, fewer tourists" },
      "February": { avgDayTemp: 14, avgNightTemp: 6, rainfall: 40, description: "Late winter, early spring feel" },
      "March": { avgDayTemp: 17, avgNightTemp: 8, rainfall: 40, description: "Spring begins, wildflowers bloom" },
      "April": { avgDayTemp: 21, avgNightTemp: 12, rainfall: 25, description: "Perfect spring weather" },
      "May": { avgDayTemp: 26, avgNightTemp: 16, rainfall: 20, description: "Ideal conditions, perfect for islands" },
      "June": { avgDayTemp: 31, avgNightTemp: 20, rainfall: 10, description: "Hot and dry, great for beaches" },
      "July": { avgDayTemp: 33, avgNightTemp: 23, rainfall: 5, description: "Very hot, peak summer season" },
      "August": { avgDayTemp: 33, avgNightTemp: 23, rainfall: 8, description: "Hottest month, perfect for swimming" },
      "September": { avgDayTemp: 29, avgNightTemp: 19, rainfall: 15, description: "Perfect autumn weather" },
      "October": { avgDayTemp: 23, avgNightTemp: 14, rainfall: 50, description: "Mild autumn, ideal for sightseeing" },
      "November": { avgDayTemp: 18, avgNightTemp: 10, rainfall: 55, description: "Cool autumn, fewer crowds" },
      "December": { avgDayTemp: 14, avgNightTemp: 7, rainfall: 65, description: "Mild winter, off-season" }
    }
  },
  {
    name: "Turkey",
    code: "TR",
    coordinates: [38.9637, 35.2433],
    monthlyData: {
      "January": { avgDayTemp: 9, avgNightTemp: 3, rainfall: 99, description: "Cool winter, fewer tourists" },
      "February": { avgDayTemp: 11, avgNightTemp: 4, rainfall: 74, description: "Late winter, mild temperatures" },
      "March": { avgDayTemp: 15, avgNightTemp: 7, rainfall: 71, description: "Spring begins, pleasant weather" },
      "April": { avgDayTemp: 20, avgNightTemp: 11, rainfall: 46, description: "Beautiful spring, perfect for touring" },
      "May": { avgDayTemp: 25, avgNightTemp: 15, rainfall: 34, description: "Ideal weather, blooming season" },
      "June": { avgDayTemp: 30, avgNightTemp: 19, rainfall: 21, description: "Hot and sunny, great for coast" },
      "July": { avgDayTemp: 33, avgNightTemp: 22, rainfall: 16, description: "Very hot, peak summer" },
      "August": { avgDayTemp: 33, avgNightTemp: 22, rainfall: 23, description: "Hottest month, beach season" },
      "September": { avgDayTemp: 28, avgNightTemp: 18, rainfall: 33, description: "Perfect autumn weather" },
      "October": { avgDayTemp: 22, avgNightTemp: 13, rainfall: 58, description: "Mild autumn, ideal conditions" },
      "November": { avgDayTemp: 16, avgNightTemp: 8, rainfall: 53, description: "Cool autumn, good for cities" },
      "December": { avgDayTemp: 11, avgNightTemp: 5, rainfall: 99, description: "Cool winter, off-season" }
    }
  },
  {
    name: "Egypt",
    code: "EG",
    coordinates: [26.0975, 31.2357],
    monthlyData: {
      "January": { avgDayTemp: 19, avgNightTemp: 9, rainfall: 5, description: "Perfect winter weather, peak season" },
      "February": { avgDayTemp: 21, avgNightTemp: 10, rainfall: 3, description: "Ideal conditions, dry and mild" },
      "March": { avgDayTemp: 24, avgNightTemp: 13, rainfall: 3, description: "Perfect spring weather" },
      "April": { avgDayTemp: 29, avgNightTemp: 17, rainfall: 1, description: "Warm and dry, excellent conditions" },
      "May": { avgDayTemp: 33, avgNightTemp: 21, rainfall: 1, description: "Hot but comfortable, dry weather" },
      "June": { avgDayTemp: 35, avgNightTemp: 23, rainfall: 0, description: "Very hot, peak summer heat" },
      "July": { avgDayTemp: 35, avgNightTemp: 25, rainfall: 0, description: "Extremely hot, desert conditions" },
      "August": { avgDayTemp: 35, avgNightTemp: 25, rainfall: 0, description: "Hottest month, very dry" },
      "September": { avgDayTemp: 32, avgNightTemp: 22, rainfall: 0, description: "Hot but manageable" },
      "October": { avgDayTemp: 28, avgNightTemp: 18, rainfall: 1, description: "Perfect autumn weather returns" },
      "November": { avgDayTemp: 24, avgNightTemp: 14, rainfall: 3, description: "Ideal conditions, peak season begins" },
      "December": { avgDayTemp: 20, avgNightTemp: 10, rainfall: 6, description: "Perfect winter weather" }
    }
  },
  {
    name: "India",
    code: "IN",
    coordinates: [20.5937, 78.9629],
    monthlyData: {
      "January": { avgDayTemp: 23, avgNightTemp: 10, rainfall: 15, description: "Perfect winter weather, peak season" },
      "February": { avgDayTemp: 26, avgNightTemp: 13, rainfall: 18, description: "Ideal conditions, dry and warm" },
      "March": { avgDayTemp: 32, avgNightTemp: 19, rainfall: 13, description: "Hot but pleasant, good for travel" },
      "April": { avgDayTemp: 36, avgNightTemp: 24, rainfall: 15, description: "Very hot, dry season" },
      "May": { avgDayTemp: 37, avgNightTemp: 27, rainfall: 36, description: "Extremely hot, pre-monsoon" },
      "June": { avgDayTemp: 34, avgNightTemp: 27, rainfall: 109, description: "Monsoon begins, hot and humid" },
      "July": { avgDayTemp: 31, avgNightTemp: 26, rainfall: 189, description: "Peak monsoon, heavy rains" },
      "August": { avgDayTemp: 30, avgNightTemp: 25, rainfall: 174, description: "Monsoon continues, very wet" },
      "September": { avgDayTemp: 31, avgNightTemp: 24, rainfall: 119, description: "Late monsoon, warm and wet" },
      "October": { avgDayTemp: 32, avgNightTemp: 19, rainfall: 32, description: "Post-monsoon, pleasant weather returns" },
      "November": { avgDayTemp: 28, avgNightTemp: 14, rainfall: 12, description: "Perfect autumn weather" },
      "December": { avgDayTemp: 24, avgNightTemp: 11, rainfall: 10, description: "Ideal winter conditions" }
    }
  },
  {
    name: "United States",
    code: "US",
    coordinates: [37.0902, -95.7129],
    monthlyData: {
      "January": { avgDayTemp: 2, avgNightTemp: -7, rainfall: 74, description: "Cold winter, snow in many areas" },
      "February": { avgDayTemp: 5, avgNightTemp: -4, rainfall: 69, description: "Late winter, still cold" },
      "March": { avgDayTemp: 11, avgNightTemp: 1, rainfall: 82, description: "Spring begins, variable weather" },
      "April": { avgDayTemp: 17, avgNightTemp: 7, rainfall: 78, description: "Beautiful spring weather" },
      "May": { avgDayTemp: 23, avgNightTemp: 13, rainfall: 108, description: "Perfect weather, peak travel season" },
      "June": { avgDayTemp: 28, avgNightTemp: 18, rainfall: 97, description: "Summer begins, warm weather" },
      "July": { avgDayTemp: 30, avgNightTemp: 21, rainfall: 103, description: "Hot summer, vacation time" },
      "August": { avgDayTemp: 29, avgNightTemp: 20, rainfall: 89, description: "Peak summer heat" },
      "September": { avgDayTemp: 25, avgNightTemp: 16, rainfall: 84, description: "Perfect autumn weather" },
      "October": { avgDayTemp: 18, avgNightTemp: 9, rainfall: 69, description: "Beautiful fall colors" },
      "November": { avgDayTemp: 11, avgNightTemp: 2, rainfall: 64, description: "Cool autumn, Thanksgiving season" },
      "December": { avgDayTemp: 4, avgNightTemp: -4, rainfall: 73, description: "Winter begins, cold weather" }
    }
  },
  {
    name: "Mexico",
    code: "MX",
    coordinates: [23.6345, -102.5528],
    monthlyData: {
      "January": { avgDayTemp: 21, avgNightTemp: 7, rainfall: 13, description: "Perfect winter weather, dry season" },
      "February": { avgDayTemp: 24, avgNightTemp: 9, rainfall: 7, description: "Ideal conditions, peak tourist season" },
      "March": { avgDayTemp: 27, avgNightTemp: 12, rainfall: 5, description: "Perfect spring weather" },
      "April": { avgDayTemp: 30, avgNightTemp: 16, rainfall: 8, description: "Hot and dry, excellent conditions" },
      "May": { avgDayTemp: 32, avgNightTemp: 19, rainfall: 43, description: "Very hot, dry season ending" },
      "June": { avgDayTemp: 30, avgNightTemp: 20, rainfall: 119, description: "Rainy season begins, hot and humid" },
      "July": { avgDayTemp: 28, avgNightTemp: 19, rainfall: 158, description: "Peak rainy season, frequent storms" },
      "August": { avgDayTemp: 28, avgNightTemp: 19, rainfall: 155, description: "Continued rains, very humid" },
      "September": { avgDayTemp: 27, avgNightTemp: 18, rainfall: 145, description: "Late rainy season, hurricane risk" },
      "October": { avgDayTemp: 26, avgNightTemp: 15, rainfall: 49, description: "Rains decreasing, pleasant weather" },
      "November": { avgDayTemp: 24, avgNightTemp: 11, rainfall: 11, description: "Perfect autumn weather, dry season" },
      "December": { avgDayTemp: 22, avgNightTemp: 8, rainfall: 8, description: "Ideal winter conditions return" }
    }
  },
  {
    name: "China",
    code: "CN",
    coordinates: [35.8617, 104.1954],
    monthlyData: {
      "January": { avgDayTemp: -4, avgNightTemp: -13, rainfall: 4, description: "Very cold winter, dry conditions" },
      "February": { avgDayTemp: 1, avgNightTemp: -9, rainfall: 5, description: "Cold winter continues, Chinese New Year" },
      "March": { avgDayTemp: 9, avgNightTemp: -1, rainfall: 14, description: "Spring begins, warming weather" },
      "April": { avgDayTemp: 18, avgNightTemp: 7, rainfall: 26, description: "Beautiful spring weather" },
      "May": { avgDayTemp: 24, avgNightTemp: 13, rainfall: 50, description: "Perfect weather, ideal for travel" },
      "June": { avgDayTemp: 28, avgNightTemp: 18, rainfall: 78, description: "Hot summer begins, rainy season" },
      "July": { avgDayTemp: 30, avgNightTemp: 21, rainfall: 180, description: "Hot and wet, peak summer" },
      "August": { avgDayTemp: 29, avgNightTemp: 20, rainfall: 152, description: "Continued heat and rain" },
      "September": { avgDayTemp: 24, avgNightTemp: 15, rainfall: 74, description: "Perfect autumn weather" },
      "October": { avgDayTemp: 17, avgNightTemp: 8, rainfall: 28, description: "Beautiful fall season" },
      "November": { avgDayTemp: 8, avgNightTemp: 0, rainfall: 11, description: "Cool autumn, dry weather" },
      "December": { avgDayTemp: 0, avgNightTemp: -8, rainfall: 3, description: "Cold winter begins" }
    }
  },
  {
    name: "United Kingdom",
    code: "GB",
    coordinates: [55.3781, -3.4360],
    monthlyData: {
      "January": { avgDayTemp: 7, avgNightTemp: 2, rainfall: 84, description: "Cold and wet winter" },
      "February": { avgDayTemp: 7, avgNightTemp: 2, rainfall: 60, description: "Late winter, still cold and damp" },
      "March": { avgDayTemp: 10, avgNightTemp: 4, rainfall: 65, description: "Spring begins, changeable weather" },
      "April": { avgDayTemp: 13, avgNightTemp: 6, rainfall: 52, description: "Pleasant spring, occasional showers" },
      "May": { avgDayTemp: 17, avgNightTemp: 9, rainfall: 55, description: "Beautiful spring weather" },
      "June": { avgDayTemp: 20, avgNightTemp: 12, rainfall: 58, description: "Perfect summer weather, long days" },
      "July": { avgDayTemp: 22, avgNightTemp: 14, rainfall: 56, description: "Peak summer, warmest month" },
      "August": { avgDayTemp: 21, avgNightTemp: 13, rainfall: 71, description: "Late summer, still warm" },
      "September": { avgDayTemp: 19, avgNightTemp: 11, rainfall: 64, description: "Mild autumn weather" },
      "October": { avgDayTemp: 14, avgNightTemp: 8, rainfall: 84, description: "Cool autumn, increasing rain" },
      "November": { avgDayTemp: 10, avgNightTemp: 5, rainfall: 78, description: "Cool and wet autumn" },
      "December": { avgDayTemp: 7, avgNightTemp: 3, rainfall: 89, description: "Cold winter returns" }
    }
  },
  {
    name: "Germany",
    code: "DE",
    coordinates: [51.1657, 10.4515],
    monthlyData: {
      "January": { avgDayTemp: 3, avgNightTemp: -2, rainfall: 40, description: "Cold winter, occasional snow" },
      "February": { avgDayTemp: 5, avgNightTemp: -1, rainfall: 33, description: "Late winter, still cold" },
      "March": { avgDayTemp: 10, avgNightTemp: 2, rainfall: 40, description: "Spring begins, mild weather" },
      "April": { avgDayTemp: 15, avgNightTemp: 6, rainfall: 37, description: "Beautiful spring weather" },
      "May": { avgDayTemp: 20, avgNightTemp: 10, rainfall: 54, description: "Perfect weather, ideal for travel" },
      "June": { avgDayTemp: 23, avgNightTemp: 13, rainfall: 65, description: "Warm summer weather" },
      "July": { avgDayTemp: 25, avgNightTemp: 15, rainfall: 78, description: "Peak summer, warmest month" },
      "August": { avgDayTemp: 25, avgNightTemp: 15, rainfall: 66, description: "Continued summer heat" },
      "September": { avgDayTemp: 20, avgNightTemp: 11, rainfall: 48, description: "Perfect autumn weather" },
      "October": { avgDayTemp: 14, avgNightTemp: 7, rainfall: 35, description: "Mild autumn, beautiful colors" },
      "November": { avgDayTemp: 8, avgNightTemp: 3, rainfall: 48, description: "Cool autumn, shorter days" },
      "December": { avgDayTemp: 4, avgNightTemp: 0, rainfall: 46, description: "Cold winter, Christmas markets" }
    }
  },
  {
    name: "Indonesia",
    code: "ID",
    coordinates: [-0.7893, 113.9213],
    monthlyData: {
      "January": { avgDayTemp: 30, avgNightTemp: 23, rainfall: 300, description: "Hot and very wet, peak rainy season" },
      "February": { avgDayTemp: 30, avgNightTemp: 23, rainfall: 270, description: "Continued heavy rains, hot and humid" },
      "March": { avgDayTemp: 31, avgNightTemp: 24, rainfall: 210, description: "Late rainy season, still very wet" },
      "April": { avgDayTemp: 32, avgNightTemp: 24, rainfall: 150, description: "Transition period, decreasing rains" },
      "May": { avgDayTemp: 32, avgNightTemp: 24, rainfall: 90, description: "Dry season begins, hot weather" },
      "June": { avgDayTemp: 31, avgNightTemp: 23, rainfall: 50, description: "Peak dry season, ideal conditions" },
      "July": { avgDayTemp: 31, avgNightTemp: 22, rainfall: 30, description: "Perfect weather, coolest dry month" },
      "August": { avgDayTemp: 32, avgNightTemp: 22, rainfall: 25, description: "Continued dry weather, excellent conditions" },
      "September": { avgDayTemp: 33, avgNightTemp: 23, rainfall: 40, description: "Hot and dry, great for islands" },
      "October": { avgDayTemp: 33, avgNightTemp: 24, rainfall: 90, description: "Transition to wet season" },
      "November": { avgDayTemp: 32, avgNightTemp: 24, rainfall: 180, description: "Rainy season begins, increasing humidity" },
      "December": { avgDayTemp: 31, avgNightTemp: 23, rainfall: 280, description: "Heavy rains return, very wet" }
    }
  },
  {
    name: "Canada",
    code: "CA",
    coordinates: [56.1304, -106.3468],
    monthlyData: {
      "January": { avgDayTemp: -10, avgNightTemp: -20, rainfall: 48, description: "Very cold winter, snow and ice" },
      "February": { avgDayTemp: -7, avgNightTemp: -17, rainfall: 35, description: "Continued cold, winter activities" },
      "March": { avgDayTemp: -1, avgNightTemp: -10, rainfall: 44, description: "Late winter, warming begins" },
      "April": { avgDayTemp: 8, avgNightTemp: -2, rainfall: 47, description: "Spring begins, variable weather" },
      "May": { avgDayTemp: 16, avgNightTemp: 5, rainfall: 68, description: "Beautiful spring weather" },
      "June": { avgDayTemp: 21, avgNightTemp: 10, rainfall: 79, description: "Perfect summer weather begins" },
      "July": { avgDayTemp: 24, avgNightTemp: 13, rainfall: 88, description: "Peak summer, warmest month" },
      "August": { avgDayTemp: 23, avgNightTemp: 12, rainfall: 89, description: "Late summer, still warm" },
      "September": { avgDayTemp: 18, avgNightTemp: 7, rainfall: 78, description: "Beautiful autumn weather" },
      "October": { avgDayTemp: 11, avgNightTemp: 1, rainfall: 61, description: "Cool autumn, fall colors" },
      "November": { avgDayTemp: 2, avgNightTemp: -6, rainfall: 54, description: "Cold autumn, winter approaching" },
      "December": { avgDayTemp: -6, avgNightTemp: -15, rainfall: 52, description: "Cold winter begins" }
    }
  },
  {
    name: "South Africa",
    code: "ZA",
    coordinates: [-30.5595, 22.9375],
    monthlyData: {
      "January": { avgDayTemp: 26, avgNightTemp: 16, rainfall: 114, description: "Hot summer, rainy season" },
      "February": { avgDayTemp: 26, avgNightTemp: 16, rainfall: 90, description: "Late summer, still hot and wet" },
      "March": { avgDayTemp: 24, avgNightTemp: 14, rainfall: 82, description: "Autumn begins, pleasant weather" },
      "April": { avgDayTemp: 21, avgNightTemp: 10, rainfall: 41, description: "Perfect autumn weather, dry season" },
      "May": { avgDayTemp: 18, avgNightTemp: 7, rainfall: 20, description: "Mild winter begins, ideal conditions" },
      "June": { avgDayTemp: 16, avgNightTemp: 4, rainfall: 9, description: "Cool winter, dry and sunny" },
      "July": { avgDayTemp: 16, avgNightTemp: 4, rainfall: 8, description: "Coldest month, perfect weather" },
      "August": { avgDayTemp: 18, avgNightTemp: 6, rainfall: 11, description: "Late winter, warming begins" },
      "September": { avgDayTemp: 21, avgNightTemp: 9, rainfall: 31, description: "Spring begins, beautiful weather" },
      "October": { avgDayTemp: 23, avgNightTemp: 12, rainfall: 56, description: "Perfect spring weather, wildflowers" },
      "November": { avgDayTemp: 24, avgNightTemp: 14, rainfall: 67, description: "Warm spring, rains increasing" },
      "December": { avgDayTemp: 25, avgNightTemp: 15, rainfall: 103, description: "Hot summer returns, rainy season" }
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