
import React from 'react';
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
  Eye
} from 'lucide-react';

const Weather = () => {
  const [activeTab, setActiveTab] = React.useState<'today' | 'week'>('week');

  const handleTabChange = (tab: 'today' | 'week') => {
    setActiveTab(tab);
  };

  const cityImageUrl = 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=150&fit=crop&crop=entropy&auto=format';

  const hourlyForecast = [
    { time: '00:00', temp: 10, icon: Moon },
    { time: '03:00', temp: 8, icon: Moon },
    { time: '06:00', temp: 7, icon: Sun },
    { time: '09:00', temp: 11, icon: Sun },
    { time: '12:00', temp: 14, icon: Sun },
    { time: '15:00', temp: 13, icon: CloudSun },
    { time: '18:00', temp: 11, icon: CloudSun },
    { time: '21:00', temp: 10, icon: Moon },
  ];

  const weeklyForecast = [
    { day: 'Sun', icon: Sun, temp: 15, color: 'text-yellow-400' },
    { day: 'Mon', icon: Sun, temp: 13, color: 'text-yellow-400' },
    { day: 'Tue', icon: Sun, temp: 11, color: 'text-yellow-400' },
    { day: 'Wed', icon: Sun, temp: 9, color: 'text-yellow-400' },
    { day: 'Thu', icon: Snowflake, temp: 7, color: 'text-blue-400' },
    { day: 'Fri', icon: Sun, temp: 5, color: 'text-yellow-400' },
    { day: 'Sat', icon: Sun, temp: 3, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white rounded-3xl shadow-2xl mx-2 md:mx-6 my-2 md:my-6 min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-3rem)] flex flex-col lg:flex-row overflow-hidden animate-fade-in border border-gray-200">
        {/* Left Panel */}
        <div className="w-full lg:w-1/3 p-4 md:p-8 bg-gradient-to-b from-white to-blue-50 border-b lg:border-b-0 lg:border-r border-gray-100">
          <div className="relative mb-4 md:mb-8 animate-slide-in-left">
            <Input
              type="text"
              placeholder="Search for places..."
              className="pl-10 md:pl-12 pr-4 md:pr-6 py-3 md:py-4 w-full bg-gray-50 border-none text-sm md:text-base rounded-2xl shadow-inner hover:shadow-lg transition-all duration-300"
            />
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
          </div>

          <div className="text-center mb-6 md:mb-12 animate-scale-in">
            <div className="text-yellow-400 mb-4 md:mb-6 animate-pulse">
              <Sun className="w-20 h-20 md:w-32 md:h-32 mx-auto drop-shadow-lg animate-bounce" />
            </div>
            <div className="text-4xl md:text-8xl font-light mb-2 md:mb-4 bg-gradient-to-b from-gray-700 to-gray-900 bg-clip-text text-transparent">12°C</div>
            <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg">Monday, 16:00</div>
            <div className="flex items-center justify-center gap-2 md:gap-3 text-gray-600 mb-4 md:mb-8 animate-fade-in">
              <Cloud className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
              <span className="text-sm md:text-lg">Mostly Cloudy</span>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3 text-gray-600 animate-fade-in">
              <Droplets className="w-4 h-4 md:w-5 md:h-5 text-blue-500 animate-bounce" />
              <span className="text-sm md:text-lg">Rain - 30%</span>
            </div>
          </div>

          <Card className="overflow-hidden cursor-pointer rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-slide-in-up">
            <img src={cityImageUrl} alt="New York" className="w-full h-20 md:h-[120px] object-cover" />
            <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 bg-gradient-to-r from-gray-50 to-white">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 animate-pulse" />
              <span className="text-gray-700 text-sm md:text-lg">New York, NY, USA</span>
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
              <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                °C
              </button>
              <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                °F
              </button>
              <Avatar className="cursor-pointer w-10 h-10 md:w-12 md:h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" />
              </Avatar>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-6 mb-8 md:mb-12 animate-fade-in">
            {activeTab === 'week' ? (
              weeklyForecast.map((item, index) => (
                <div 
                  key={item.day} 
                  className="text-center p-3 md:p-5 bg-gradient-to-b from-white to-gray-50 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 cursor-pointer animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-xs md:text-base text-gray-600 mb-2 md:mb-3 font-medium">{item.day}</div>
                  <item.icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto ${item.color} mb-2 md:mb-3 drop-shadow-md animate-pulse`} />
                  <div className="text-sm md:text-base font-semibold text-gray-800">{item.temp}°</div>
                </div>
              ))
            ) : (
              hourlyForecast.map((hour, index) => (
                <div 
                  key={hour.time} 
                  className="text-center p-3 md:p-5 bg-gradient-to-b from-white to-gray-50 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 cursor-pointer animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-xs md:text-base text-gray-600 mb-2 md:mb-3 font-medium">{hour.time}</div>
                  <hour.icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 drop-shadow-md animate-pulse ${
                    hour.icon === Sun || hour.icon === CloudSun ? 'text-yellow-400' : 'text-gray-400'
                  }`} />
                  <div className="text-sm md:text-base font-semibold text-gray-800">{hour.temp}°</div>
                </div>
              ))
            )}
          </div>

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
              <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">7.70</div>
              <div className="flex items-center gap-2 md:gap-3 text-gray-600">
                <Navigation className="w-4 h-4 md:w-5 md:h-5 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-base md:text-lg">WSW</span>
              </div>
            </Card>

            <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-orange-50 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
              <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Sunrise & Sunset</div>
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 animate-pulse" />
                <span className="text-base md:text-lg">6:35 AM</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 animate-pulse" />
                <span className="text-base md:text-lg">5:42 PM</span>
              </div>
            </Card>

            <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-blue-50 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
              <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Humidity</div>
              <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">12%</div>
              <div className="text-sm md:text-base text-gray-600">Normal</div>
            </Card>

            <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-gray-50 animate-slide-in-up" style={{ animationDelay: '500ms' }}>
              <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Visibility</div>
              <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">5.2</div>
              <div className="text-sm md:text-base text-gray-600">Average</div>
            </Card>

            <Card className="p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-red-50 animate-slide-in-up" style={{ animationDelay: '600ms' }}>
              <div className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg font-medium">Air Quality</div>
              <div className="text-3xl md:text-5xl font-light mb-3 md:mb-4 text-gray-800">105</div>
              <div className="text-sm md:text-base text-red-600 font-medium">Unhealthy</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
