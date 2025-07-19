import React from 'react';
import { Headphones, TrendingUp, Monitor, Globe, Heart, PieChart } from 'lucide-react';

const ProcessSection = () => {
  const processes = [
    {
      icon: Headphones,
      title: "Support",
      description: "24/7 agricultural support for farmers, connecting them with experts. Get immediate help for crop issues and farming challenges."
    },
    {
      icon: TrendingUp,
      title: "Sales",
      description: "Direct marketplace connecting farmers with buyers, ensuring fair prices for agricultural products and seamless transactions."
    },
    {
      icon: Monitor,
      title: "Onboarding",
      description: "Simple onboarding process for farmers to join our platform. Easy registration and quick access to all farming tools."
    },
    {
      icon: Globe,
      title: "Product",
      description: "Comprehensive agricultural platform offering crop management, weather insights, and market analytics for modern farming."
    },
    {
      icon: Heart,
      title: "Quality",
      description: "Ensuring highest quality standards for agricultural products through monitoring and quality control systems."
    },
    {
      icon: PieChart,
      title: "Result",
      description: "Track farming results and productivity improvements. Data-driven insights to optimize crop yields and profitability."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Make every step farmer-centric
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our comprehensive agricultural platform puts farmers first, providing tools and support for every aspect of modern farming.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {processes.map((process, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <process.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {process.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {process.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;