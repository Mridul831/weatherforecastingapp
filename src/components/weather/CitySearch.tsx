import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface CitySearchProps {
  onSearch: (city: string) => void;
  currentCity: string;
}

export function CitySearch({ onSearch, currentCity }: CitySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-glass border-glass backdrop-blur-glass"
          />
        </div>
        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>Currently showing: {currentCity}</span>
      </div>
    </div>
  );
}