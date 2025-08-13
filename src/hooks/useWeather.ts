import { useState, useEffect } from 'react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
}

interface ForecastData {
  day: string;
  date: string;
  condition: string;
  high: number;
  low: number;
  precipitation: number;
}

// Mock weather data for demo purposes
const generateMockWeather = (city: string): WeatherData => {
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    location: city,
    temperature: Math.floor(Math.random() * 40) + 40, // 40-80°F
    condition: randomCondition,
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 mph
    visibility: Math.floor(Math.random() * 10) + 5, // 5-15 miles
    feelsLike: Math.floor(Math.random() * 40) + 40, // 40-80°F
  };
};

const generateMockForecast = (): ForecastData[] => {
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'];
  const dates = ['Mar 15', 'Mar 16', 'Mar 17', 'Mar 18', 'Mar 19'];
  
  return days.map((day, index) => ({
    day,
    date: dates[index],
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    high: Math.floor(Math.random() * 20) + 60, // 60-80°F
    low: Math.floor(Math.random() * 20) + 40, // 40-60°F
    precipitation: Math.floor(Math.random() * 100), // 0-100%
  }));
};

export function useWeather(initialCity: string = 'New York') {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState(initialCity);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const weatherData = generateMockWeather(city);
      const forecastData = generateMockForecast();
      
      setWeather(weatherData);
      setForecast(forecastData);
      setCurrentCity(city);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(currentCity);
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    currentCity,
    fetchWeather,
  };
}