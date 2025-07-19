import React from 'react';
import { Download, Settings, Star, ChevronRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Download,
      title: "Install the App",
      description: "Get started by downloading QuestionBank.AI to your device."
    },
    {
      icon: Settings,
      title: "Setup your profile",
      description: "Personalize your experience by creating your unique learning profile."
    },
    {
      icon: Star,
      title: "Enjoy the features!",
      description: "Dive into all the powerful AI tools and resources at your fingertips!"
    }
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How QuestionBank.AI works?
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Customize your learning, practice with AI-generated questions, and track your progress—
            all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center">
              <div className="text-center mb-6 md:mb-0">
                <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-blue-100 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mx-8">
                  <ChevronRight className="w-8 h-8 text-white/60" />
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