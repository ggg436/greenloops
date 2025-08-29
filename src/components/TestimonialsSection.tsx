import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'A GreenLoop User',
      company: 'Community Member',
      rating: 5,
      testimonial: 'With GreenLoop, recycling is no longer a burden. I earn rewards, track my eco-impact, and feel proud to make a difference.',
      bgColor: 'bg-green-500'
    },
    {
      name: 'Sarah Chen', 
      company: 'Eco-conscious Household',
      rating: 5,
      testimonial: 'The app makes recycling so easy! I love earning GreenPoints and seeing how much waste I\'ve diverted from landfills.',
      bgColor: 'bg-emerald-500'
    },
    {
      name: 'Michael Rodriguez',
      company: 'Local Collector',
      rating: 5,
      testimonial: 'GreenLoop has streamlined our pickup operations and increased community participation by 40%. It\'s been a game-changer!',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Emma Thompson',
      company: 'Business Owner',
      rating: 5,
      testimonial: 'The user interface is incredibly intuitive and the support team is always there when we need them. Fantastic platform!',
      bgColor: 'bg-purple-500'
    },
    {
      name: 'Devon Lane',
      company: 'Environmental Advocate',
      rating: 5,
      testimonial: 'GreenLoop is transforming how communities think about waste. It\'s not just recycling—it\'s building a sustainable future.',
      bgColor: 'bg-teal-500'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const getSlideClass = (index: number) => {
    const diff = (index - currentIndex + testimonials.length) % testimonials.length;
    if (diff === 0) return 'translate-x-0 scale-100 opacity-100 z-20'; // Center
    if (diff === 1 || diff === testimonials.length - 1) return diff === 1 ? 'translate-x-[80%] scale-75 opacity-60 z-10' : '-translate-x-[80%] scale-75 opacity-60 z-10'; // Sides
    return 'translate-x-full scale-50 opacity-0 z-0'; // Hidden
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-green-600 font-medium mb-2">5000+ Happy Eco-Conscious Users</div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Don't just take our words
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="relative h-80 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${getSlideClass(index)}`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 mx-4 h-full flex flex-col justify-center max-w-2xl mx-auto">
                  {/* Color Square and Stars */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className={`w-16 h-16 rounded-lg ${testimonial.bgColor} flex-shrink-0`}></div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed font-medium">
                    "{testimonial.testimonial}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-30"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-30"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;