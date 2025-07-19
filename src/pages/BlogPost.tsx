import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog posts data (in a real app, this would come from an API)
  const blogPosts = [
    {
      id: "1",
      title: "Beyond Transactions: Unlocking the Full Potential of Your POS System",
      author: "Sam Pitak",
      date: "20 Apr 2024",
      description: "In the realm of modern business operations, a Point of Sale (POS) system serves as more than just a transaction tool...",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>In the realm of modern business operations, a Point of Sale (POS) system serves as more than just a transaction tool. It's the nerve center that orchestrates various aspects of your business, from inventory management to customer relationship building.</p>
        
        <h2>The Evolution of POS Systems</h2>
        <p>Today's POS systems have evolved far beyond simple cash registers. They integrate seamlessly with your business operations, providing real-time insights, automating processes, and enhancing customer experiences. Modern POS solutions offer cloud-based functionality, multi-location support, and advanced analytics that can transform how you understand and run your business.</p>
        
        <h2>Key Features That Drive Business Growth</h2>
        <p>Advanced POS systems offer inventory tracking, customer management, sales reporting, and integration capabilities that can streamline your operations. These features work together to create a comprehensive business management platform that grows with your needs.</p>
        
        <h2>Making the Right Choice</h2>
        <p>When selecting a POS system, consider your specific business needs, scalability requirements, and integration possibilities. The right system should not just process transactions but should become an integral part of your business strategy.</p>
      `
    },
    {
      id: "2",
      title: "From Brick-and-Mortar to Online Storefront: Integrating E-commerce with Your POS",
      author: "Yuli Sumpit",
      date: "20 Apr 2024",
      description: "In the realm of modern business operations, a Point of Sale (POS) system serves as more than just a transaction tool...",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>The integration of brick-and-mortar stores with online platforms has become essential for modern retail success. A unified POS system can bridge this gap, creating a seamless omnichannel experience for both businesses and customers.</p>
        
        <h2>The Omnichannel Advantage</h2>
        <p>By connecting your physical and digital storefronts through an integrated POS system, you can offer customers a consistent experience regardless of how they choose to shop. This includes unified inventory management, consistent pricing, and seamless customer service across all channels.</p>
        
        <h2>Implementation Strategies</h2>
        <p>Successfully integrating e-commerce with your POS requires careful planning, proper technology selection, and staff training. The goal is to create a system where online and offline operations complement rather than compete with each other.</p>
        
        <h2>Benefits of Integration</h2>
        <p>Integrated systems provide better inventory visibility, improved customer insights, streamlined operations, and increased sales opportunities through cross-channel marketing and customer engagement.</p>
      `
    },
    {
      id: "3",
      title: "Security First: Protecting Your Business with Advanced POS System Features",
      author: "Ambon Fanda",
      date: "20 Apr 2024",
      description: "One of the primary functions of a POS system is to process transactions and handle sensitive customer information...",
      image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Security is paramount when dealing with customer payment information and sensitive business data. Modern POS systems must incorporate robust security measures to protect against fraud, data breaches, and other cyber threats.</p>
        
        <h2>Essential Security Features</h2>
        <p>Advanced POS systems include end-to-end encryption, tokenization, PCI DSS compliance, and secure user authentication. These features work together to create multiple layers of protection for your business and customer data.</p>
        
        <h2>Compliance and Regulations</h2>
        <p>Understanding and maintaining compliance with industry standards like PCI DSS is crucial for any business handling payment information. Your POS system should help facilitate this compliance rather than complicate it.</p>
        
        <h2>Best Practices for POS Security</h2>
        <p>Regular software updates, strong password policies, employee training, and regular security audits are essential components of a comprehensive POS security strategy. Prevention is always better than dealing with the aftermath of a security breach.</p>
      `
    }
  ];

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Sample related posts for sidebar
  const relatedPosts = [
    {
      id: 1,
      title: "Understanding Transitional Justice Mechanisms",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Human Rights in Post-Conflict Societies",
      date: "March 10, 2024", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "The Role of International Organizations",
      date: "March 5, 2024",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Use the tech design for all posts
  const postDesign = "tech";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white">
              {/* Heading at the top */}
              <header className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {post.description}
                </p>
              </header>

              {/* Large image below heading */}
              <div className="mb-8">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>

              {/* Author info and date */}
              <div className="flex items-center gap-6 text-gray-500 text-sm mb-8 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
              
              {/* Text content below image */}
              <div className="prose prose-lg prose-gray max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed space-y-6 text-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Articles */}
            <div>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex gap-4">
                      <div className="w-20 h-16 flex-shrink-0 overflow-hidden">
                        <img 
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer mb-1">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-500">{relatedPost.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;