import React from 'react';
import { Layers, BarChart3, Shield, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DiscoverSection = () => {
  const features = [
    {
      icon: Layers,
      description: "Our platform is intuitively designed to provide a seamless, user-friendly experience for learners and educators alike, minimizing the learning curve and maximizing productivity."
    },
    {
      icon: BarChart3,
      description: "Leverage detailed analytics and reporting tools to gain deep insights into performance trends, learning patterns, and progress over time."
    },
    {
      icon: Shield,
      description: "We prioritize your data's safety with advanced encryption and privacy measures, ensuring a secure and trustworthy environment for all users."
    },
    {
      icon: ShoppingCart,
      description: "Engage with cutting-edge tools and interactive features that make learning more dynamic, engaging, and effective."
    }
  ];

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Discover The Difference By Yourself
            </h2>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-600 leading-relaxed pt-2">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg">
                Get Started for Free
              </Button>
            </div>
          </div>

          {/* Right Image - Mobile Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Mobile Screen Content */}
                  <div className="bg-blue-600 h-24 flex items-center justify-between px-6 text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                      <span className="font-medium">QB Student</span>
                    </div>
                    <div className="w-6 h-6 bg-white/20 rounded"></div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">News & Updates</div>
                      <div className="text-gray-900 font-medium">Notice for Enrolled Students: Question Bank Access</div>
                      <div className="text-xs text-gray-500 mt-2">Now Available</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-100 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">10</div>
                        <div className="text-xs text-gray-600">Practice</div>
                      </div>
                      <div className="bg-green-100 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">5</div>
                        <div className="text-xs text-gray-600">Generate Set</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-medium">B.Sc. CSIT</div>
                        <div className="text-xs text-gray-500">SET I</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-medium">SET II</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
                    <div className="flex justify-around">
                      <div className="text-center">
                        <div className="w-6 h-6 bg-blue-600 rounded mx-auto mb-1"></div>
                        <div className="text-xs">Home</div>
                      </div>
                      <div className="text-center">
                        <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1"></div>
                        <div className="text-xs">Generate</div>
                      </div>
                      <div className="text-center">
                        <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1"></div>
                        <div className="text-xs">Classes</div>
                      </div>
                      <div className="text-center">
                        <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1"></div>
                        <div className="text-xs">More</div>
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

export default DiscoverSection;