export interface WeatherCondition {
  icon: string;
  emoji: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  description: string;
}

export const getWeatherCondition = (
  dayTemp: number, 
  nightTemp: number, 
  rainfall: number
): WeatherCondition => {
  const avgTemp = (dayTemp + nightTemp) / 2;

  // Very high rainfall (monsoon/heavy storms)
  if (rainfall > 200) {
    return {
      icon: "🌊⛈️",
      emoji: "⛈️",
      bgColor: "bg-gradient-to-br from-gray-700 to-blue-900",
      textColor: "text-white",
      borderColor: "border-blue-400",
      description: "Heavy storms & flooding"
    };
  }

  // High rainfall with moderate/high temp (tropical rain)
  if (rainfall > 100 && avgTemp > 20) {
    return {
      icon: "🌧️🌴",
      emoji: "🌧️",
      bgColor: "bg-gradient-to-br from-green-600 to-blue-600",
      textColor: "text-white",
      borderColor: "border-green-400",
      description: "Tropical rainy season"
    };
  }

  // High rainfall with cool temp (winter rain)
  if (rainfall > 100) {
    return {
      icon: "🌧️❄️",
      emoji: "🌧️",
      bgColor: "bg-gradient-to-br from-gray-500 to-blue-600",
      textColor: "text-white",
      borderColor: "border-blue-300",
      description: "Cold & wet season"
    };
  }

  // Moderate rainfall (spring/autumn)
  if (rainfall > 50) {
    return {
      icon: "🌦️🍃",
      emoji: "🌦️",
      bgColor: "bg-gradient-to-br from-blue-400 to-green-500",
      textColor: "text-white",
      borderColor: "border-blue-300",
      description: "Showery weather"
    };
  }

  // Very hot and dry (desert)
  if (dayTemp > 35 && rainfall < 20) {
    return {
      icon: "🏜️☀️",
      emoji: "☀️",
      bgColor: "bg-gradient-to-br from-yellow-400 to-orange-600",
      textColor: "text-white",
      borderColor: "border-orange-400",
      description: "Hot & arid desert"
    };
  }

  // Very hot (tropical)
  if (dayTemp > 30) {
    return {
      icon: "🌞🔥",
      emoji: "🌞",
      bgColor: "bg-gradient-to-br from-yellow-300 to-red-500",
      textColor: "text-white",
      borderColor: "border-yellow-400",
      description: "Very hot & sunny"
    };
  }

  // Warm and pleasant
  if (avgTemp > 20) {
    return {
      icon: "☀️🌸",
      emoji: "☀️",
      bgColor: "bg-gradient-to-br from-yellow-200 to-green-400",
      textColor: "text-gray-800",
      borderColor: "border-yellow-300",
      description: "Warm & pleasant"
    };
  }

  // Cool but not cold
  if (avgTemp > 10) {
    return {
      icon: "🌤️🍂",
      emoji: "🌤️",
      bgColor: "bg-gradient-to-br from-blue-200 to-gray-400",
      textColor: "text-gray-800",
      borderColor: "border-blue-300",
      description: "Cool & mild"
    };
  }

  // Cold (near freezing)
  if (avgTemp > 0) {
    return {
      icon: "🌨️🧊",
      emoji: "❄️",
      bgColor: "bg-gradient-to-br from-blue-300 to-gray-600",
      textColor: "text-white",
      borderColor: "border-blue-400",
      description: "Cold & chilly"
    };
  }

  // Very cold (below freezing)
  return {
    icon: "❄️🏔️",
    emoji: "❄️",
    bgColor: "bg-gradient-to-br from-blue-600 to-purple-800",
    textColor: "text-white",
    borderColor: "border-blue-500",
    description: "Freezing conditions"
  };
};

export const getRainfallLevel = (rainfall: number): string => {
  if (rainfall === 0) return "No rain";
  if (rainfall <= 10) return "Very light";
  if (rainfall <= 30) return "Light";
  if (rainfall <= 60) return "Moderate";
  if (rainfall <= 100) return "Heavy";
  if (rainfall <= 200) return "Very heavy";
  return "Extreme";
};

export const getTemperatureFeeling = (temp: number): string => {
  if (temp < 0) return "Freezing";
  if (temp < 10) return "Cold";
  if (temp < 20) return "Cool";
  if (temp < 25) return "Mild";
  if (temp < 30) return "Warm";
  if (temp < 35) return "Hot";
  return "Very hot";
};