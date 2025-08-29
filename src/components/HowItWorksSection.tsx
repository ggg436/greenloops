import React from 'react';
import { Smartphone, User, Gift, ChevronRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "1️⃣ Download GreenLoop",
      description: "Install the app and start managing your recyclable waste with ease."
    },
    {
      icon: User,
      title: "2️⃣ Register Your Profile",
      description: "Add household, business, or collector details for tailored recycling solutions."
    },
    {
      icon: Gift,
      title: "3️⃣ Recycle Smarter, Earn Rewards",
      description: "Schedule pickups, reduce waste, and earn GreenPoints for your contributions."
    }
  ];

  return (
    <section className="py-20 px-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            How GreenLoop Works
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Get personalized recycling insights, schedule pickups, and track your eco-impact — designed for households, businesses, and collectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center">
              <div className="text-center mb-6 md:mb-0">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mx-8">
                  <ChevronRight className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;