import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DashboardSection = () => {
  const [activeTab, setActiveTab] = useState('RECYCLING ANALYTICS');

  const tabs = [
    'RECYCLING ANALYTICS',
    'ECO-IMPACT TRACKING', 
    'PICKUP SCHEDULING',
    'GREENPOINTS REWARDS'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            GreenLoop helps communities grow
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our platform empowers individuals, households, and businesses to recycle responsibly, cut costs, and contribute to a circular economy.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2"
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
            <div className="text-center space-y-6">
              <div className="text-4xl">📊</div>
              <h3 className="text-2xl font-bold text-green-800">Dashboard: Track pickups, GreenPoints, CO₂ saved, and recycling progress.</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">500k+</div>
                  <div className="text-sm text-green-700">Successful pickups</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-green-700">Monitoring</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">45%</div>
                  <div className="text-sm text-green-700">Waste Reduction</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-green-700">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;