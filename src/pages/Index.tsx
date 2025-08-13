import { WeatherCard } from "@/components/weather/WeatherCard";
import { ForecastCard } from "@/components/weather/ForecastCard";
import { CitySearch } from "@/components/weather/CitySearch";
import { useWeather } from "@/hooks/useWeather";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CloudRain } from "lucide-react";
import heroImage from "@/assets/weather-hero-bg.jpg";

const Index = () => {
  const { weather, forecast, loading, error, currentCity, fetchWeather } = useWeather();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="min-h-screen bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CloudRain className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">WeatherCast</h1>
            </div>
            <p className="text-muted-foreground text-lg">Your beautiful weather companion</p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <CitySearch onSearch={fetchWeather} currentCity={currentCity} />
          </div>

          {/* Error State */}
          {error && (
            <Alert className="mb-8 bg-destructive/10 border-destructive/20">
              <AlertDescription className="text-destructive">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-8">
              <Skeleton className="h-64 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-40" />
                ))}
              </div>
            </div>
          )}

          {/* Weather Content */}
          {!loading && weather && (
            <div className="space-y-8">
              {/* Current Weather */}
              <WeatherCard weather={weather} className="max-w-2xl mx-auto" />

              {/* 5-Day Forecast */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center text-foreground">
                  5-Day Forecast
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {forecast.map((day, index) => (
                    <ForecastCard key={index} forecast={day} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 text-center text-muted-foreground">
            <p>&copy; 2024 WeatherCast. Beautiful weather forecasting.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;