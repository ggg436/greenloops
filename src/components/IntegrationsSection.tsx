import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageCircle, ShoppingBag, MessageSquare, Award, Settings } from 'lucide-react';

const IntegrationsSection = () => {
  const integrations = [
    {
      name: '📩 Email Alerts',
      description: 'Get notified about pickup schedules and recycling updates.',
      icon: Mail,
      color: 'text-red-600'
    },
    {
      name: '💬 EcoChat',
      description: 'Connect with local recyclers, collectors, and communities.',
      icon: MessageCircle, 
      color: 'text-blue-600'
    },
    {
      name: '🛒 EcoMarket',
      description: 'Redeem GreenPoints for discounts, eco-products, or services.',
      icon: ShoppingBag,
      color: 'text-green-600'
    },
    {
      name: '🎧 Support Center',
      description: '24/7 support for queries, guidance, and recycling tips.',
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      name: '📲 Social Badges',
      description: 'Showcase your eco-impact and inspire others.',
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      name: '🛠️ EcoTools',
      description: 'Access calculators for carbon savings and waste reduction.',
      icon: Settings,
      color: 'text-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Integrate with essential apps
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            GreenLoop works seamlessly with your daily tools, making recycling smarter and easier:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 ${integration.color}`}>
                    <integration.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription>Direct Integration</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href="#" className="text-green-600 hover:text-green-700 font-medium">
            Check all 1,593 applications
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;