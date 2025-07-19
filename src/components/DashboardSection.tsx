import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DashboardSection = () => {
  const [activeTab, setActiveTab] = useState('CROP ANALYTICS');

  const tabs = [
    'CROP ANALYTICS',
    'FARM MANAGEMENT', 
    'MARKET INSIGHTS',
    'WEATHER TRACKING'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            AgriTech helps farmers grow
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our platform provides farmers with the essential tools and insights needed to create 
            successful, sustainable farming operations, from seed to harvest and beyond.
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

        <div className="bg-gray-900 rounded-xl p-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            {/* Mock Dashboard Interface */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-white font-semibold">🌾 AgriTech</div>
                <nav className="hidden md:flex gap-6 text-sm text-gray-300">
                  <span>Dashboard</span>
                  <span>Analytics</span>
                  <span>Products</span>
                  <span>Customers</span>
                  <span>Support</span>
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <span className="text-white text-sm">Wade Warren</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Hey Jacob 👋</h3>
                  <p className="text-gray-300 text-sm mb-4">Here's what's happening with your farm today.</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-2xl font-bold">83</span>
                      <span className="text-white text-2xl font-bold">$5,994</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Active Crops</span>
                      <span>Expected Yield</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-300">
                    <div>• 6 new sales last month</div>
                    <div>• 7 new customers last purchased subscriptions</div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Traffic Sources</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Direct</span>
                      <span className="text-white">1,45,365</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Referral</span>
                      <span className="text-white">87,914</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column */}
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-semibold">Sales Report</h4>
                    <Badge variant="secondary">Export CSV</Badge>
                  </div>
                  <div className="h-32 bg-gray-600 rounded flex items-end justify-center p-4">
                    <div className="text-gray-300 text-center">
                      <div className="text-2xl font-bold text-white">$45,940</div>
                      <div className="text-sm">Revenue Growth</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Activity</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Kristin Watson', action: 'Purchased Clarity subscription' },
                      { name: 'Brooklyn Simmons', action: 'Pre-Ordered Clarity subscription' },
                      { name: 'Devon Howard', action: 'Pre-Ordered Clarity subscription' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                        <div>
                          <div className="text-white text-sm">{item.name}</div>
                          <div className="text-gray-400 text-xs">{item.action}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Insights</h4>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-300">
                      <span className="text-blue-400">39%</span> of your visitors are coming from Twitter
                    </div>
                    <div className="text-gray-300">
                      Current RRR is the highest in last 12 months
                    </div>
                    <div className="text-gray-300">
                      Your highest growth in a day is 14 customers
                    </div>
                    <div className="text-gray-300">
                      Your Bounce rate is 64% now
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-blue-400 text-sm cursor-pointer">View all messages &gt;</span>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-semibold">Latest Transactions</h4>
                    <span className="text-gray-400 text-xs">Sort by: Recent</span>
                  </div>
                  <div className="text-gray-400 text-xs">
                    Recent farming transactions and activities
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

export default DashboardSection;