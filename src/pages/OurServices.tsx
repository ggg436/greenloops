import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sprout, 
  CloudSunRain, 
  Tractor, 
  BarChart3,
  Store,
  AlertTriangle,
  Leaf,
  GraduationCap
} from 'lucide-react';

const OurServices = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive agricultural technology solutions designed specifically for Nepali farmers
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Crop Monitoring */}
          <Card className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Crop Monitoring</CardTitle>
              </div>
              <CardDescription className="text-base">
                Real-time monitoring and health assessment of your crops
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>AI-powered plant disease detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Growth tracking and yield estimation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Customized alerts for potential issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Seasonal crop planning assistance</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600">Learn More</Button>
            </CardContent>
          </Card>

          {/* Weather Insights */}
          <Card className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl">
                  <CloudSunRain className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Weather Insights</CardTitle>
              </div>
              <CardDescription className="text-base">
                Localized weather forecasting and agriculture impact analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>7-day local weather forecasts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Rainfall prediction and water management</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Weather alerts for agricultural planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Seasonal climate analysis</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-sky-600">Learn More</Button>
            </CardContent>
          </Card>

          {/* Farm Management */}
          <Card className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl">
                  <Tractor className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Farm Management</CardTitle>
              </div>
              <CardDescription className="text-base">
                Digital tools to streamline your farm operations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Inventory and resource tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Planting and harvesting schedules</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Labor management and task allocation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Cost tracking and financial insights</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-yellow-600">Learn More</Button>
            </CardContent>
          </Card>

          {/* Market Analytics */}
          <Card className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Market Analytics</CardTitle>
              </div>
              <CardDescription className="text-base">
                Price trends and market intelligence for your crops
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Real-time crop price data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Demand forecasting for key crops</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Market trend analysis and reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Best timing recommendations for selling</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-violet-600">Learn More</Button>
            </CardContent>
          </Card>

          {/* Marketplace */}
          <Card className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Farmer Marketplace</CardTitle>
              </div>
              <CardDescription className="text-base">
                Direct selling platform connecting farmers and buyers
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <span>List and sell your crops directly</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <span>Access to verified buyers and sellers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <span>Reviews and quality assurance</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600">Learn More</Button>
            </CardContent>
          </Card>

          {/* Disease Detection */}
          <Card className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Disease Detection</CardTitle>
              </div>
              <CardDescription className="text-base">
                AI-powered identification and treatment of plant diseases
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Photo-based plant disease diagnosis</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Custom treatment recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Disease prevention guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Pest identification and management</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-600">Learn More</Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your farm?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join thousands of Nepali farmers who are increasing their yields and profits with Krishak AI
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-bold">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurServices; 