import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How a visual artist redefines success in graphic design",
      category: "Growth",
      date: "April 09, 2022",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Why choose a theme that looks good with WooCommerce",
      category: "Growth", 
      date: "April 09, 2022",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "How to write content about your photographs",
      category: "Growth",
      date: "April 09, 2022", 
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Lessons and insights from 8 years of Pixelgrade",
      category: "Growth",
      date: "April 09, 2022",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Travelling as a way of self-discovery and progress",
      category: "Growth",
      date: "April 09, 2022",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "The unseen of spending three years at Pixelgrade",
      category: "Growth",
      date: "April 09, 2022",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
            Latest from our blog
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Create custom landing pages with Rareblocks that converts more visitors than any website.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-3xl">
              <div className="aspect-[4/3] overflow-hidden rounded-t-3xl">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-zinc-600">
                  <span className="font-medium">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 leading-tight hover:text-zinc-700 transition-colors cursor-pointer">
                  {post.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;