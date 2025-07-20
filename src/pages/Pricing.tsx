
import React, { useState } from 'react';
import { Check, Tractor, Wheat, Sprout, Flower2, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Beginner Farmer',
      price: 2000,
      description: 'Essential tools for small-scale and beginner farmers.',
      features: [
        'Crop monitoring for 5 hectares',
        'Basic weather alerts',
        'Market price updates',
        'Community forum access'
      ],
      popular: false
    },
    {
      name: 'Growing Farmer',
      price: 4000,
      description: 'Advanced tools for growing farms with expanding operations.',
      features: [
        'Crop monitoring for 15 hectares',
        'Advanced weather forecasting',
        'Pest & disease detection',
        'Soil analysis reports',
        '48-hour support response time'
      ],
      popular: false
    },
    {
      name: 'Commercial Farmer',
      price: 7000,
      description: 'Complete solution for commercial farming operations.',
      features: [
        'Crop monitoring for 50 hectares',
        'Real-time weather alerts',
        'Advanced pest & disease analytics',
        'Yield prediction tools',
        'Marketplace priority listing',
        '24-hour support response time'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 12000,
      description: 'Custom solutions for large agricultural enterprises.',
      features: [
        'Unlimited hectare monitoring',
        'Custom crop analytics',
        'Supply chain integration',
        'AI-powered yield optimization',
        'Dedicated account manager',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  // Farm product icons for visual appeal
  const PlanIcons = {
    'Beginner Farmer': Sprout,
    'Growing Farmer': Flower2,
    'Commercial Farmer': Wheat,
    'Enterprise': Tractor
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="text-sm text-blue-600 font-medium mb-4">Pricing</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Agriculture Solutions Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a plan that's tailored to your farming needs, from small-scale operations 
            to large agricultural enterprises, with tools designed for Nepalese farmers.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 p-1 rounded-2xl">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  !isAnnual ? 'bg-blue-600 text-white' : 'text-gray-500'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isAnnual ? 'bg-blue-600 text-white' : 'text-gray-500'
                }`}
              >
                Annually
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => {
            const PlanIcon = PlanIcons[plan.name as keyof typeof PlanIcons];
            return (
              <Card 
                key={plan.name} 
                className={`relative bg-white border-2 rounded-3xl transition-all duration-200 hover:shadow-lg ${
                  plan.popular 
                    ? 'border-blue-600 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-left p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <PlanIcon className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      NPR {isAnnual ? Math.floor(plan.price * 0.8).toLocaleString() : plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-green-500" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? 'default' : 'outline'}
                    className={`w-full rounded-2xl ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional information */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">All plans include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-4">
              <CloudRain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Weather Monitoring</h3>
              <p className="text-gray-600">Location-specific weather data for better farm planning</p>
            </div>
            <div className="p-4">
              <Wheat className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Crop Advisory</h3>
              <p className="text-gray-600">Expert tips on crop management specific to Nepal's climates</p>
            </div>
            <div className="p-4">
              <Flower2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Market Connect</h3>
              <p className="text-gray-600">Connect with buyers and get fair prices for your produce</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
