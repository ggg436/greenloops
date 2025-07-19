import React from 'react';
import { Layers, MessageSquare, Shield, Globe, Shuffle, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DifferenceSection = () => {
  const features = [
    {
      icon: Layers,
      title: "AI-Powered Question Generation",
      description: "Experience limitless, AI-driven question creation across diverse subjects and topics."
    },
    {
      icon: MessageSquare,
      title: "Customizable Question Sets",
      description: "Tailor your learning with fully customizable question banks for any need."
    },
    {
      icon: Shield,
      title: "Learning Progress Insights",
      description: "Monitor your learning journey in real-time with intuitive progress tracking tools."
    },
    {
      icon: Globe,
      title: "Online Exam Solutions",
      description: "Streamline assessments with secure, efficient, and fully online exam capabilities."
    },
    {
      icon: Shuffle,
      title: "Random/Surprise Question Generation",
      description: "Keep your mind sharp with unpredictable, AI-generated questions on the fly."
    },
    {
      icon: HelpCircle,
      title: "Instant Doubt Resolution",
      description: "Get immediate answers to your questions with our 24/7 instant doubt resolution feature."
    }
  ];

  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Makes QuestionBank.AI Different?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            QuestionBank.AI stands out with its AI-driven, customizable question generation and 
            seamless online exam solutions, redefining modern learning and assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;