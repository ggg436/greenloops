import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, ArrowRight } from 'lucide-react';

const CTASection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Get full access to<br />
          AgriTech Solutions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          Transform your farming operations with our comprehensive agricultural platform. 
          Access advanced tools, market insights, and community support to grow your business sustainably.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
          <Input
            type="email"
            placeholder="Enter email to get started"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 text-base"
            required
          />
          <Button type="submit" size="lg" className="h-12 px-8">
            Get instant access
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="h-4 w-4" />
          <span>Your data is completely secured with us. We don't share with anyone.</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;