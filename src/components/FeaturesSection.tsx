import React from 'react';
import { Cloud, BarChart3, ShoppingCart, Bot, Leaf, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: Cloud,
      title: "Weather Monitoring",
      description: "Real-time weather data and forecasts to help you make informed farming decisions."
    },
    {
      icon: BarChart3,
      title: "Crop Analytics",
      description: "Advanced analytics to track crop health, yield predictions, and growth patterns."
    },
    {
      icon: ShoppingCart,
      title: "Marketplace",
      description: "Buy and sell agricultural products directly with other farmers and suppliers."
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Get expert farming advice and solutions from our AI-powered plant doctor."
    },
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Tools and insights to promote eco-friendly and sustainable farming practices."
    },
    {
      icon: TrendingUp,
      title: "Yield Optimization",
      description: "Data-driven recommendations to maximize your crop yields and farm profitability."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            Everything You Need for Modern Farming
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and insights you need to optimize your farm operations and increase productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-zinc-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;