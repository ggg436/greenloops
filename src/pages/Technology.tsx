import React from 'react';
import { 
  Database, 
  Cloud, 
  Cpu, 
  Smartphone, 
  Wifi, 
  Eye, 
  Brain,
  LineChart,
  Layers,
  Shield,
  Zap,
  Server
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Technology = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Technology</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge agricultural solutions designed specifically for Nepal's unique farming landscape
          </p>
        </div>

        {/* AI Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Artificial Intelligence at the Core</h2>
            <p className="text-lg text-gray-700 mb-6">
              At GreenLoop, we leverage advanced machine learning algorithms and deep neural networks to 
              analyze agricultural data and provide insights that would be impossible through traditional methods.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Machine Learning</h3>
                  <p className="text-gray-700">Our algorithms learn from thousands of data points to make increasingly accurate predictions about crop health, weather patterns, and market trends.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Computer Vision</h3>
                  <p className="text-gray-700">Advanced image recognition technology identifies plant diseases, pests, and growth patterns from simple smartphone photos.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <LineChart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Predictive Analytics</h3>
                  <p className="text-gray-700">Using historical and real-time data to forecast crop yields, optimal planting times, and market pricing trends.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl">
            <div className="aspect-square bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <Cpu className="w-32 h-32 text-white/50 absolute" />
              <Database className="w-24 h-24 text-white/50 absolute top-10 left-10" />
              <Cloud className="w-20 h-20 text-white/50 absolute bottom-10 right-10" />
              <div className="z-10 text-center p-6 bg-white/10 backdrop-blur-md rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-2">AI-Driven Farming</h3>
                <p className="text-white/90">Transforming traditional agriculture with data intelligence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built on robust, scalable technologies that work reliably even in areas with limited connectivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full">
                    <Layers className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Multi-Model Architecture</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600">Our system combines multiple specialized AI models to address different aspects of farming, from disease detection to weather prediction.</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Mobile-First Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600">Our applications are optimized for smartphones, ensuring farmers can access critical information from anywhere in their fields.</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full">
                    <Wifi className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Offline Capability</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600">Core features work without internet connection, with data synchronization when connectivity is available.</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full">
                    <Cloud className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Cloud Processing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600">Heavy computational tasks are performed in the cloud, minimizing device requirements while providing powerful analysis capabilities.</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Secure Infrastructure</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600">End-to-end encryption and robust security protocols keep farmer data and personal information protected at all times.</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Low-Resource Optimization</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600">Designed to work on entry-level smartphones with minimal data usage, making our technology accessible to all farmers.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Processing Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="order-2 lg:order-1 bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl">
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square bg-gradient-to-r from-green-200 to-green-300 rounded-2xl flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-green-700" />
              </div>
              <div className="aspect-square bg-gradient-to-r from-green-300 to-green-400 rounded-2xl flex items-center justify-center">
                <Wifi className="w-12 h-12 text-green-700" />
              </div>
              <div className="aspect-square bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center">
                <Server className="w-12 h-12 text-white" />
              </div>
              <div className="aspect-square bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Database className="w-12 h-12 text-white" />
              </div>
              <div className="aspect-square bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="aspect-square bg-gradient-to-r from-green-700 to-green-800 rounded-2xl flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-green-700 mb-6">How Our Data Processing Works</h2>
            <p className="text-lg text-gray-700 mb-6">
              From farm to insights and back again, our system processes agricultural data through a sophisticated
              pipeline designed for accuracy, speed, and relevance to Nepali farming conditions.
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Data Collection</h3>
                  <p className="text-gray-700">Information is gathered from farm sensors, weather stations, satellite imagery, and farmer-submitted photos.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Processing & Analysis</h3>
                  <p className="text-gray-700">Our AI models process the data, identifying patterns, anomalies, and actionable insights.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Recommendation Generation</h3>
                  <p className="text-gray-700">Based on analysis results, the system creates customized recommendations for each farm and crop.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Delivery to Farmers</h3>
                  <p className="text-gray-700">Insights are delivered through our mobile app in simple, actionable formats with minimal text and clear visuals.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Experience the technology for yourself</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Join thousands of Nepali farmers who are using our technology to transform their agricultural practices
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-bold text-green-700">
            Request a Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Technology; 