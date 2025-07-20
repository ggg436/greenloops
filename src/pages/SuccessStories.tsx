import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Ramesh Tamang",
      location: "Kavrepalanchok",
      crop: "Rice and Vegetables",
      image: "/farmers/farmer1.jpg", // These images would need to be added to the public folder
      quote: "With Krishak AI's disease detection, I identified a fungal infection early and saved 80% of my tomato crop. My income has increased by 35% since I started using the app.",
      results: [
        "40% increase in crop yield",
        "Early detection of plant diseases",
        "30% reduction in water usage",
        "Better market prices through timing insights"
      ]
    },
    {
      id: 2,
      name: "Sarita Gurung",
      location: "Kaski",
      crop: "Tea and Cardamom",
      image: "/farmers/farmer2.jpg",
      quote: "The weather predictions are surprisingly accurate for our microclimate. I've optimized my irrigation schedule and reduced water waste significantly.",
      results: [
        "25% water conservation",
        "Prevented crop damage during unexpected rains",
        "Improved quality of cardamom",
        "Connected with direct buyers through the marketplace"
      ]
    },
    {
      id: 3,
      name: "Bishnu Prasad Sharma",
      location: "Syangja",
      crop: "Maize and Millet",
      image: "/farmers/farmer3.jpg",
      quote: "The market price predictions helped me time my harvest perfectly. I sold when prices were highest and increased my profit margin by 40%.",
      results: [
        "Better price negotiation with traders",
        "Reduced post-harvest losses by 30%",
        "Implemented more efficient farming techniques",
        "Connected with three new bulk buyers"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from real Nepali farmers who have transformed their farms using Krishak AI technology
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">5,000+</div>
              <p className="text-lg text-gray-700">Farmers Using Krishak AI</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">32%</div>
              <p className="text-lg text-gray-700">Average Yield Increase</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">45%</div>
              <p className="text-lg text-gray-700">Disease Prevention Rate</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">28%</div>
              <p className="text-lg text-gray-700">Water Conservation</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Success Story */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Quote className="text-white h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                "Krishak AI has completely transformed my approach to farming. What used to be guesswork is now data-driven decision making."
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                I've been farming for 20 years, but in just one season with Krishak AI, I learned techniques that increased my rice yield by 40%. The disease detection feature alone saved my entire crop from blast disease.
              </p>
              <div>
                <p className="text-white font-bold text-lg">Krishna Bahadur Thapa</p>
                <p className="text-blue-200">Rice farmer, Chitwan</p>
              </div>
            </div>
            <div className="bg-blue-700 min-h-[400px]">
              {/* This would be a farmer image */}
              <div className="w-full h-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
                <p className="text-white/50 text-xl font-medium">Farmer Image</p>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer Success Stories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Stories from Our Farmers</h2>
          
          {stories.map((story, index) => (
            <div 
              key={story.id} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Quote className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-xl text-gray-700 italic">"{story.quote}"</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{story.name}</h3>
                  <p className="text-lg text-gray-600">{story.crop} Farmer, {story.location}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Results with Krishak AI:</h4>
                  <ul className="space-y-2">
                    {story.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`bg-gray-100 rounded-2xl min-h-[350px] ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {/* This would be the farmer's image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <p className="text-gray-400 text-xl font-medium">Farmer {story.id} Image</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Farmers Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border border-gray-200 rounded-xl shadow-md">
                <CardContent className="pt-8">
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-green-500 opacity-50" />
                  </div>
                  <p className="text-gray-700 mb-6">
                    {[
                      "The weather alerts have saved my crops multiple times from unexpected rain. This app is worth every rupee.",
                      "I've been able to connect with buyers directly and get 20% better prices than through middlemen.",
                      "The plant disease identification is like having an expert agronomist in my pocket at all times.",
                      "I used to struggle with timing my planting, but now I follow Krishak AI's recommendations and my yields have improved.",
                      "The market price predictions helped me decide when to sell my produce and increased my profits.",
                      "As a woman farmer, this app has given me access to knowledge that was previously hard to obtain in my village."
                    ][i]}
                  </p>
                  <div>
                    <p className="font-bold text-gray-900">
                      {[
                        "Hari Kumar Shrestha",
                        "Gita Poudel",
                        "Dinesh Rai",
                        "Sita Kumari",
                        "Birendra Thapa",
                        "Lakshmi Magar"
                      ][i]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {[
                        "Vegetable farmer, Dhading",
                        "Apple grower, Jumla",
                        "Rice farmer, Jhapa",
                        "Tea farmer, Ilam",
                        "Potato farmer, Dolakha",
                        "Mixed crop farmer, Dang"
                      ][i]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join our community of successful farmers</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Start your journey to increased yields, better crop quality, and higher profits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-bold text-green-700">
              Register Your Farm
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-bold text-white border-white hover:bg-white/10">
              Contact an Advisor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories; 