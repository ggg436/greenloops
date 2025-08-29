import React from 'react';
import { Check, Smartphone, Apple } from 'lucide-react';

const MobileAppSection = () => {
  const features = [
    "Smart recycling tracking",
    "Earn GreenPoints rewards", 
    "Schedule pickups easily",
    "Track eco-impact"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                What are you waiting for?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Download the GreenLoop app today and start recycling smarter! Get real-time insights, connect with collectors, and track your eco-impact all in one app.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-foreground text-background px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-foreground/90 transition-colors">
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs opacity-70">DOWNLOAD ON THE</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </button>
              
              <button className="bg-foreground text-background px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-foreground/90 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-70">GET IT ON</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </button>
            </div>

            {/* Available on text */}
            <div className="text-center text-sm text-muted-foreground">
              📱 Available on:
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[640px] bg-foreground rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-foreground rounded-b-2xl z-10"></div>
                  
                  {/* App Interface */}
                  <div className="pt-12 px-6 h-full bg-gradient-to-br from-green-50 to-emerald-50">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <div className="text-green-600 font-bold">🌱 GreenLoop</div>
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>

                    <div className="text-muted-foreground text-sm mb-2">This month</div>
                    <div className="text-2xl font-bold text-foreground mb-6">Recycling Analytics</div>

                    {/* Chart Area */}
                    <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-green-200">
                      <div className="flex justify-end mb-4">
                        <div className="w-24 h-12 bg-green-100 rounded-lg"></div>
                      </div>
                      <div className="flex items-end space-x-2 h-32 mb-4">
                        {[40, 60, 80, 100, 85, 70].map((height, i) => (
                          <div key={i} className={`bg-green-500 rounded-t flex-1 ${i === 4 ? 'bg-green-700' : ''}`} style={{height: `${height}%`}}></div>
                        ))}
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-200">
                      <div className="text-sm text-muted-foreground mb-2">Waste Distribution</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Recycled</span>
                          </div>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm">Compost</span>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm">Landfill</span>
                          </div>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;