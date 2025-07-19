import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Beyond Transactions: Unlocking the Full Potential of Your POS System",
      author: "Sam Pitak",
      date: "20 Apr 2024",
      description: "In the realm of modern business operations, a Point of Sale (POS) system serves as more than just a transaction tool...",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "From Brick-and-Mortar to Online Storefront: Integrating E-commerce with Your POS",
      author: "Yuli Sumpit", 
      date: "20 Apr 2024",
      description: "In the realm of modern business operations, a Point of Sale (POS) system serves as more than just a transaction tool...",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Security First: Protecting Your Business with Advanced POS System Features",
      author: "Ambon Fanda",
      date: "20 Apr 2024",
      description: "One of the primary functions of a POS system is to process transactions and handle sensitive customer information...",
      image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "Top Hidden Gems: Must-Visit Spots This Year",
      date: "August 7, 2017",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Bucket List: 25 Adventures for Every Traveler",
      date: "March 23, 2013",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Travel Like a Local: Tips for Authentic Experiences",
      date: "May 31, 2015",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const latestPosts = [
    {
      id: 1,
      title: "The Ordinary: Coming Soon",
      date: "October 24, 2024",
      image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-600 font-medium mb-4">Blog</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Discover our latest news
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the achievements that set us apart. From groundbreaking projects to industry accolades,
            we take pride in our accomplishments.
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Input Placeholder" 
                className="pl-10 rounded-xl border-gray-200"
              />
            </div>
            <Button className="px-6 py-2 rounded-xl">
              Find Now
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Whiteboards are remarkable.
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                        <span className="font-medium text-blue-600">{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <Link to={`/blog/${post.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 cursor-pointer transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <Link to={`/blog/${post.id}`}>
                        <Button variant="link" className="text-blue-600 font-medium p-0 h-auto hover:text-blue-700">
                          Read More →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Featured Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Featured</h3>
                <div className="space-y-4">
                  {featuredPosts.map((post) => (
                    <div key={post.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                        <h4 className="text-sm font-semibold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Latest</h3>
                <div className="space-y-4">
                  {latestPosts.map((post) => (
                    <div key={post.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                        <h4 className="text-sm font-semibold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;