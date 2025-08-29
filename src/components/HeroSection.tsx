
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// User avatar data
const userAvatars = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwZmFybWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1580132849350-28fda8fef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybWVyJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1589677677517-5784e74663ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFybWVyJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
];

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1.5 bg-green-50 border border-green-100 rounded-full text-green-600 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              🟢 GreenLoop – Revolutionizing Recycling with Smart Technology
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Revolutionizing <span className="text-green-600">Recycling</span> with AI & Smart Tech
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Empower communities with data-driven recycling solutions. GreenLoop connects households, collectors, and recycling centers in one seamless ecosystem — reducing waste, rewarding eco-actions, and driving a sustainable future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 h-auto rounded-xl font-medium text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                onClick={() => navigate('/signup')}
              >
                👉 Get Started <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-6 h-auto rounded-xl font-medium text-lg flex items-center gap-2"
              >
                <Play className="h-5 w-5" /> Watch Demo
              </Button>
            </div>
            
            <div className="pt-6">
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {userAvatars.map((avatar, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                        <img 
                          src={avatar} 
                          alt={`User ${i+1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">⭐ Trusted by eco-conscious users worldwide</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 font-medium ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Eco-friendly illustration or stats */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <div className="text-center space-y-6">
                <div className="text-6xl">🌱</div>
                <h3 className="text-2xl font-bold text-green-800">What our users say</h3>
                <p className="text-green-700">See how communities are transforming waste into value with GreenLoop.</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-green-700">User Satisfaction</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">45%</div>
                    <div className="text-sm text-green-700">Waste Reduction</div>
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

export default HeroSection;
