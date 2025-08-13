import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, Thermometer } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
}

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes('sun') || lower.includes('clear')) return Sun;
  if (lower.includes('rain') || lower.includes('shower')) return CloudRain;
  if (lower.includes('snow')) return CloudSnow;
  if (lower.includes('cloud')) return Cloud;
  return Sun;
};

const getWeatherGradient = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes('sun') || lower.includes('clear')) return 'bg-gradient-sunny';
  if (lower.includes('rain') || lower.includes('shower')) return 'bg-gradient-rainy';
  if (lower.includes('snow')) return 'bg-gradient-cloudy';
  if (lower.includes('cloud')) return 'bg-gradient-cloudy';
  return 'bg-gradient-clear';
};

export function WeatherCard({ weather, className }: WeatherCardProps) {
  const WeatherIcon = getWeatherIcon(weather.condition);
  const gradientClass = getWeatherGradient(weather.condition);

  return (
    <Card className={`relative overflow-hidden border-glass backdrop-blur-glass ${className}`}>
      <div className={`absolute inset-0 ${gradientClass} opacity-20`} />
      <div className="relative p-6 bg-glass border border-glass backdrop-blur-glass">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{weather.location}</h2>
            <p className="text-muted-foreground capitalize">{weather.condition}</p>
          </div>
          <WeatherIcon className="h-12 w-12 text-primary" />
        </div>
        
        <div className="flex items-center mb-6">
          <span className="text-6xl font-light text-foreground">
            {Math.round(weather.temperature)}°
          </span>
          <div className="ml-4 text-muted-foreground">
            <p className="flex items-center gap-1">
              <Thermometer className="h-4 w-4" />
              Feels like {Math.round(weather.feelsLike)}°
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Droplets className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <Wind className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-sm text-muted-foreground">Wind</p>
            <p className="font-semibold">{weather.windSpeed} mph</p>
          </div>
          <div className="text-center">
            <Eye className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-sm text-muted-foreground">Visibility</p>
            <p className="font-semibold">{weather.visibility} mi</p>
          </div>
        </div>
      </div>
    </Card>
  );
}