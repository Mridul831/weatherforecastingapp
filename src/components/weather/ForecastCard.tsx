import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react";

interface ForecastData {
  day: string;
  date: string;
  condition: string;
  high: number;
  low: number;
  precipitation: number;
}

interface ForecastCardProps {
  forecast: ForecastData;
}

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes('sun') || lower.includes('clear')) return Sun;
  if (lower.includes('rain') || lower.includes('shower')) return CloudRain;
  if (lower.includes('snow')) return CloudSnow;
  if (lower.includes('cloud')) return Cloud;
  return Sun;
};

export function ForecastCard({ forecast }: ForecastCardProps) {
  const WeatherIcon = getWeatherIcon(forecast.condition);

  return (
    <Card className="p-4 bg-glass border-glass backdrop-blur-glass hover:bg-secondary/50 transition-colors">
      <div className="text-center space-y-3">
        <div>
          <p className="font-semibold text-foreground">{forecast.day}</p>
          <p className="text-xs text-muted-foreground">{forecast.date}</p>
        </div>
        
        <WeatherIcon className="h-8 w-8 text-primary mx-auto" />
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold">{Math.round(forecast.high)}°</span>
            <span className="text-muted-foreground">{Math.round(forecast.low)}°</span>
          </div>
          <p className="text-xs text-muted-foreground capitalize">{forecast.condition}</p>
          {forecast.precipitation > 0 && (
            <p className="text-xs text-primary">{forecast.precipitation}% rain</p>
          )}
        </div>
      </div>
    </Card>
  );
}