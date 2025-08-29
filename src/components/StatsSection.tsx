import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: "98%",
      label: "User Satisfaction Rate",
      description: "Our users report increased satisfaction with recycling"
    },
    {
      number: "45%",
      label: "Reduction in household waste sent to landfills",
      description: "Communities see significant improvements in waste reduction"
    },
    {
      number: "24/7",
      label: "Monitoring & Support",
      description: "Continuous monitoring of your recycling operations"
    },
    {
      number: "500k+",
      label: "Successful pickups managed",
      description: "Total recycling pickups being optimized with our platform"
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            Trusted by Users Worldwide 🌍
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Join thousands of eco-conscious users who are already transforming their communities with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-xl font-semibold text-zinc-900 mb-2">{stat.label}</div>
              <div className="text-zinc-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;