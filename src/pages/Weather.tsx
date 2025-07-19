
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Sun, 
  Cloud, 
  CloudRain, 
  MapPin, 
  Droplets, 
  Moon,
  CloudSun,
  Snowflake,
  Navigation,
  Eye,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

// API key
const API_KEY = '98ea5dd81e14e3fa312dbe7cf40c958b';

// Weather data interfaces
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  dt: number;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      icon: string;
    }>;
  }>;
}

const Weather = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('week');
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [searchCity, setSearchCity] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [tempUnit, setTempUnit] = useState<'metric' | 'imperial'>('metric');

  // Get temperature unit symbol
  const getTempUnitSymbol = () => tempUnit === 'metric' ? 'C' : 'F';
  
  // Format temperature for display with conversion if needed
  const formatTemp = (temp: number): number => {
    // Data is always fetched in metric (Celsius)
    return tempUnit === 'imperial' 
      ? Math.round((temp * 9/5) + 32) // Convert Celsius to Fahrenheit
      : Math.round(temp); // Keep as Celsius
  };

  // Get current position
  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          toast.error('Unable to retrieve your location');
          // Default to New York if location access is denied
          fetchWeatherByCity('New York');
          setLoading(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
      fetchWeatherByCity('New York');
      setLoading(false);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    try {
      // Always fetch in metric units (Celsius)
      const apiUnit = 'metric';
      console.log(`Fetching weather with API unit: ${apiUnit}, display unit: ${tempUnit}`);
      
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${apiUnit}&appid=${API_KEY}`
      );
      const weatherResult = await weatherResponse.json();
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${apiUnit}&appid=${API_KEY}`
      );
      const forecastResult = await forecastResponse.json();
      
      setWeatherData(weatherResult);
      setForecastData(forecastResult);
      setCity(weatherResult.name);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching weather data');
      setLoading(false);
    }
  };

  // Fetch weather by city name
  const fetchWeatherByCity = async (cityName: string) => {
    setLoading(true);
    try {
      // Always fetch in metric units (Celsius)
      const apiUnit = 'metric';
      console.log(`Fetching weather for ${cityName} with API unit: ${apiUnit}, display unit: ${tempUnit}`);
      
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${apiUnit}&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(`City ${cityName} not found`);
      }
      
      const weatherResult = await weatherResponse.json();
      console.log('Weather data received:', weatherResult);
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${apiUnit}&appid=${API_KEY}`
      );
      const forecastResult = await forecastResponse.json();
      
      setWeatherData(weatherResult);
      setForecastData(forecastResult);
      setCity(weatherResult.name);
      setSearchCity('');
      setLoading(false);
    } catch (error) {
      toast.error('City not found, please try again');
      setLoading(false);
    }
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherByCity(searchCity);
    }
  };

  // Handle unit change - Celsius or Fahrenheit
  const handleUnitChange = (unit: 'metric' | 'imperial') => {
    // First set the temperature unit state
    setTempUnit(unit);
    
    // Then refetch data with the new unit
    if (city) {
      fetchWeatherByCity(city);
    } else {
      getCurrentLocation();
    }
    
    console.log(`Changed temperature unit to: ${unit} (${unit === 'metric' ? '°C' : '°F'})`);
  };
  
  // Function to convert temperature between units
  const convertTemperature = (temp: number, from: 'metric' | 'imperial' = 'metric'): number => {
    if (from === 'metric' && tempUnit === 'imperial') {
      // Convert Celsius to Fahrenheit
      return (temp * 9/5) + 32;
    } else if (from === 'imperial' && tempUnit === 'metric') {
      // Convert Fahrenheit to Celsius
      return (temp - 32) * 5/9;
    }
    return temp;
  };

  const handleTabChange = (tab: 'today' | 'week') => {
    setActiveTab(tab);
  };

  // Get icon based on weather condition
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Clear':
        return Sun;
      case 'Clouds':
        return Cloud;
      case 'Rain':
        return CloudRain;
      case 'Drizzle':
        return CloudDrizzle;
      case 'Thunderstorm':
        return CloudLightning;
      case 'Snow':
        return Snowflake;
      case 'Mist':
      case 'Fog':
        return CloudFog;
      default:
        return Sun;
    }
  };

  // Format timestamp to time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // Format timestamp to day
  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Get wind direction from degrees
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // Initialize on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Get hourly forecast data (for today)
  const getHourlyForecast = () => {
    if (!forecastData) return [];
    
    // Get current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Filter for today's forecast only
    return forecastData.list
      .filter(item => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate >= today && itemDate < tomorrow;
      })
      .map(item => ({
        time: formatTime(item.dt),
        temp: item.main.temp, // Store raw temperature, format at display time
        icon: getWeatherIcon(item.weather[0].main),
        condition: item.weather[0].main
      }));
  };

  // Get daily forecast data
  const getDailyForecast = () => {
    if (!forecastData) return [];
    
    const dailyData: any = {};
    
    // Group forecast data by day
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0];
      
      if (!dailyData[day]) {
        dailyData[day] = {
          temps: [],
          icons: [],
          conditions: []
        };
      }
      
      dailyData[day].temps.push(item.main.temp);
      dailyData[day].icons.push(item.weather[0].main);
      dailyData[day].conditions.push(item.weather[0].main);
    });
    
    // Calculate average temp and most common weather condition for each day
    return Object.keys(dailyData).slice(0, 7).map(day => {
      const temps = dailyData[day].temps;
      const avgTemp = temps.reduce((sum: number, temp: number) => sum + temp, 0) / temps.length;
      
      // Find most common condition
      const conditions = dailyData[day].conditions;
      const conditionCounts: Record<string, number> = {};
      let maxCount = 0;
      let mostCommonCondition = conditions[0];
      
      conditions.forEach((condition: string) => {
        conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
        if (conditionCounts[condition] > maxCount) {
          maxCount = conditionCounts[condition];
          mostCommonCondition = condition;
        }
      });
      
      return {
        day: formatDay(new Date(day).getTime() / 1000),
        temp: avgTemp, // Store raw temperature, format at display time
        icon: getWeatherIcon(mostCommonCondition),
        condition: mostCommonCondition
      };
    });
  };

  const hourlyForecast = getHourlyForecast();
  const weeklyForecast = getDailyForecast();
  
  // Get icon color based on condition
  const getIconColor = (condition: string) => {
    switch (condition) {
      case 'Clear':
      case 'Sun':
        return 'text-yellow-400';
      case 'Clouds':
        return 'text-gray-400';
      case 'Rain':
      case 'Drizzle':
        return 'text-blue-400';
      case 'Snow':
        return 'text-blue-200';
      case 'Thunderstorm':
        return 'text-purple-500';
      default:
        return 'text-gray-400';
    }
  };

  // Get city image URL
  const getCityImageUrl = () => {
    if (!city) return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=150&fit=crop&crop=entropy&auto=format';
    return `https://source.unsplash.com/300x150/?${city},skyline`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white rounded-3xl shadow-2xl mx-2 md:mx-6 my-2 md:my-6 min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-3rem)] flex flex-col lg:flex-row overflow-hidden animate-fade-in border border-gray-200">
        {/* Left Panel */}
        <div className="w-full lg:w-1/3 p-4 md:p-8 bg-gradient-to-b from-white to-blue-50 border-b lg:border-b-0 lg:border-r border-gray-100">
          <form onSubmit={handleSearch} className="relative mb-4 md:mb-8 animate-slide-in-left">
            <Input
              type="text"
              placeholder="Search for places..."
              className="pl-10 md:pl-12 pr-4 md:pr-6 py-3 md:py-4 w-full bg-gray-50 border-none text-sm md:text-base rounded-2xl shadow-inner hover:shadow-lg transition-all duration-300"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              disabled={loading}
            />
            {loading ? (
              <Loader2 className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5 animate-spin" />
            ) : (
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            )}
          </form>

          <div className="text-center mb-6 md:mb-12 animate-scale-in">
            {weatherData ? (
              <>
                <div className={`${getIconColor(weatherData.weather[0].main)} mb-4 md:mb-6 animate-pulse`}>
                  {React.createElement(getWeatherIcon(weatherData.weather[0].main), { 
                    className: "w-20 h-20 md:w-32 md:h-32 mx-auto drop-shadow-lg animate-bounce" 
                  })}
                </div>
                <div className="text-4xl md:text-8xl font-light mb-2 md:mb-4 bg-gradient-to-b from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {formatTemp(weatherData.main.temp)}°{getTempUnitSymbol()}
                </div>
                <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg">
                  {new Date(weatherData.dt * 1000).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    hour: 'numeric', 
                    minute: 'numeric'
                  })}
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-3 text-gray-600 mb-4 md:mb-8 animate-fade-in">
                  {React.createElement(getWeatherIcon(weatherData.weather[0].main), { 
                    className: "w-4 h-4 md:w-5 md:h-5 animate-pulse" 
                  })}
                  <span className="text-sm md:text-lg">{weatherData.weather[0].description}</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-3 text-gray-600 animate-fade-in">
                  <Droplets className="w-4 h-4 md:w-5 md:h-5 text-blue-500 animate-bounce" />
                  <span className="text-sm md:text-lg">Humidity - {weatherData.main.humidity}%</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            )}
          </div>

          <Card className="overflow-hidden cursor-pointer rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-slide-in-up">
            <img src={getCityImageUrl()} alt={city || 'City'} className="w-full h-20 md:h-[120px] object-cover" />
            <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 bg-gradient-to-r from-gray-50 to-white">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 animate-pulse" />
              <span className="text-gray-700 text-sm md:text-lg">
                {weatherData ? `${weatherData.name}, ${weatherData.sys.country}` : 'Loading...'}
              </span>
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-4 md:p-8 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 animate-slide-in-right gap-4">
            <div className="flex gap-4 md:gap-6">
              <button
                className={`cursor-pointer pb-2 md:pb-3 text-base md:text-lg font-medium transition-all duration-300 ${
                  activeTab === 'today' 
                    ? 'text-blue-600 border-b-2 md:border-b-3 border-blue-600 shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600 hover:scale-105'
                }`}
                onClick={() => handleTabChange('today')}
              >
                Today
              </button>
              <button
                className={`cursor-pointer pb-2 md:pb-3 text-base md:text-lg font-medium transition-all duration-300 ${
                  activeTab === 'week' 
                    ? 'text-blue-600 border-b-2 md:border-b-3 border-blue-600 shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600 hover:scale-105'
                }`}
                onClick={() => handleTabChange('week')}
              >
                Week
              </button>
            </div>
            <div className="flex items-center gap-3 md:gap-6">
              {/* Celsius button */}
              <button 
                className={`${tempUnit === 'metric' 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'} 
                  rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
                onClick={() => handleUnitChange('metric')}
                title="Show temperature in Celsius"
              >
                °C
              </button>
              
              {/* Fahrenheit button */}
              <button 
                className={`${tempUnit === 'imperial' 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'} 
                  rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
                onClick={() => handleUnitChange('imperial')}
                title="Show temperature in Fahrenheit"
              >
                °F
              </button>
              <Avatar className="cursor-pointer w-10 h-10 md:w-12 md:h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" />
              </Avatar>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-6 mb-8 md:mb-12 animate-fade-in">
              {activeTab === 'week' ? (
                weeklyForecast.map((item, index) => (
                  <div 
                    key={index} 
                    className="text-center p-3 md:p-5 bg-gradient-to-b from-white to-gray-50 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 cursor-pointer animate-slide-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-xs md:text-base text-gray-600 mb-2 md:mb-3 font-medium">{item.day}</div>
                    {React.createElement(item.icon, { 
                      className: `w-6 h-6 md:w-8 md:h-8 mx-auto ${getIconColor(item.condition)} mb-2 md:mb-3 drop-shadow-md animate-pulse` 
                    })}
                    <div className="text-sm md:text-base font-semibold text-gray-800">
                      {formatTemp(item.temp)}°{getTempUnitSymbol()}
                    </div>
                  </div>
                ))
              ) : (
                hourlyForecast.map((hour, index) => (
                  <div 
                    key={index} 
                    className="text-center p-3 md:p-5 bg-gradient-to-b from-white to-gray-50 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 cursor-pointer animate-slide-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-xs md:text-base text-gray-600 mb-2 md:mb-3 font-medium">{hour.time}</div>
                    {React.createElement(hour.icon, { 
                      className: `w-6 h-6 md:w-8 md:h-8 mx-auto ${getIconColor(hour.condition)} mb-2 md:mb-3 drop-shadow-md animate-pulse` 
                    })}
                    <div className="text-sm md:text-base font-semibold text-gray-800">
                      {formatTemp(hour.temp)}°{getTempUnitSymbol()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {weatherData && (
            <>
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-gray-800 animate-slide-in-left">Today's Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
                <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-yellow-50 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                  <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">UV Index</div>
                  <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">5</div>
                  <div className="h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-blue-50 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                  <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Wind Status</div>
                  <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">
                    {weatherData.wind.speed} {tempUnit === 'metric' ? 'm/s' : 'mph'}
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-gray-600">
                    <Navigation 
                      className="w-4 h-4 md:w-5 md:h-5 animate-spin" 
                      style={{ 
                        animationDuration: '3s',
                        transform: `rotate(${weatherData.wind.deg}deg)`
                      }} 
                    />
                    <span className="text-base md:text-lg">{getWindDirection(weatherData.wind.deg)}</span>
                  </div>
                </Card>

                <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-orange-50 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                  <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Sunrise & Sunset</div>
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 animate-pulse" />
                    <span className="text-base md:text-lg">{formatTime(weatherData.sys.sunrise)}</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <Moon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 animate-pulse" />
                    <span className="text-base md:text-lg">{formatTime(weatherData.sys.sunset)}</span>
                  </div>
                </Card>

                <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-blue-50 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
                  <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Humidity</div>
                  <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">{weatherData.main.humidity}%</div>
                  <div className="text-sm md:text-base text-gray-600">
                    {weatherData.main.humidity < 30 ? 'Low' : 
                     weatherData.main.humidity > 70 ? 'High' : 'Normal'}
                  </div>
                </Card>

                <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-gray-50 animate-slide-in-up" style={{ animationDelay: '500ms' }}>
                  <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Visibility</div>
                  <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {weatherData.visibility > 10000 ? 'Excellent' :
                     weatherData.visibility > 5000 ? 'Good' :
                     weatherData.visibility > 1000 ? 'Average' : 'Poor'}
                  </div>
                </Card>

                <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-red-50 animate-slide-in-up" style={{ animationDelay: '600ms' }}>
                  <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Feels Like</div>
                  <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">
                    {formatTemp(weatherData.main.feels_like)}°{getTempUnitSymbol()}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {weatherData.main.feels_like > weatherData.main.temp ? 'Warmer' : 
                     weatherData.main.feels_like < weatherData.main.temp ? 'Cooler' : 'Same as actual'}
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
