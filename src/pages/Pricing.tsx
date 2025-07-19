
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Hobby',
      price: 19,
      description: 'The essentials to provide your best work for clients.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics'
      ],
      popular: false
    },
    {
      name: 'Freelancer',
      price: 29,
      description: 'The essentials to provide your best work for clients.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
        '48-hour support response time'
      ],
      popular: false
    },
    {
      name: 'Startup',
      price: 59,
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
        'Custom reporting tools'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="text-sm text-blue-600 font-medium mb-4">Pricing</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Pricing that grows with you
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose an affordable plan that's packed with the best features for 
            engaging your audience, creating customer loyalty, and driving sales.
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
          {plans.map((plan) => (
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? Math.floor(plan.price * 0.8) : plan.price}
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
                  Buy plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
