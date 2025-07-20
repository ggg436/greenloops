
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email submission here
  };

  return (
    <section className="bg-zinc-50 min-h-screen flex items-center justify-center px-8 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-zinc-900 leading-tight">
            AI-Powered Agriculture for Nepali Farmers
          </h1>
          
          <p className="text-lg text-zinc-600 leading-relaxed max-w-md">
            Krishak AI helps farmers increase yields, reduce costs, and make better decisions through AI-driven crop monitoring, disease detection, and personalized recommendations.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 px-6 text-base bg-zinc-50 border-zinc-400 rounded-2xl focus:border-zinc-600"
                required
              />
            </div>
            <Button 
              type="submit"
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 h-14 rounded-lg font-bold text-lg whitespace-nowrap"
            >
              Join Krishak AI
            </Button>
          </form>
          
          <div className="flex items-center gap-16 pt-8">
            <div className="text-center">
              <div className="text-4xl font-medium text-zinc-900 mb-1">10,000+</div>
              <div className="text-sm text-zinc-600">Farmers Connected</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex flex-col space-y-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-px bg-green-400 transform -rotate-[34deg]"
                  />
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-medium text-zinc-900 mb-1">25+</div>
              <div className="text-sm text-zinc-600">Crop Varieties Analyzed</div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex justify-center items-center">
          <div className="w-96 h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Nepali farmer using Krishak AI technology"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
