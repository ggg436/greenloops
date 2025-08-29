
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Book, 
  MessageCircle, 
  Search, 
  Video, 
  FileText, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Download,
  Play,
  Users,
  LifeBuoy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Help = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmitTicket = () => {
    toast({
      title: "Support ticket submitted",
      description: "We'll get back to you within 24 hours.",
    });
  };

  const faqItems = [
    {
      category: "Getting Started",
      items: [
        {
          question: "How do I create my first farm profile?",
          answer: "To create your farm profile, navigate to the Dashboard and click on 'Connect New Field'. Fill in your farm details including location, crop types, and acreage. Once submitted, your profile will be active within 24 hours."
        },
        {
          question: "What information do I need to get started?",
          answer: "You'll need your farm location, primary crops, acreage details, and basic contact information. Having your farming license number ready will also speed up the verification process."
        },
        {
          question: "How long does account verification take?",
          answer: "Account verification typically takes 1-2 business days. You'll receive an email confirmation once your account is verified and ready to use."
        }
      ]
    },
    {
      category: "Marketplace",
      items: [
        {
          question: "How do I list my crops for sale?",
          answer: "Go to the Marketplace section and click 'List Product'. Add photos, descriptions, pricing, and availability. Your listing will be reviewed and published within 4 hours."
        },
        {
          question: "What are the transaction fees?",
          answer: "We charge a 3% transaction fee on successful sales. This fee includes payment processing, buyer protection, and platform maintenance."
        },
        {
          question: "How do I handle shipping and delivery?",
          answer: "You can choose to handle shipping yourself or use our partner logistics network. Local deliveries can be arranged directly with buyers through our messaging system."
        }
      ]
    },
    {
      category: "Payments & Billing",
      items: [
        {
          question: "When do I receive payment for sales?",
          answer: "Payments are processed within 2-3 business days after delivery confirmation. Funds are transferred directly to your linked bank account."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit cards, bank transfers, and digital wallets. For large transactions, wire transfers are also available."
        },
        {
          question: "How do I update my payment information?",
          answer: "Go to Settings > Account > Payment Methods to add, remove, or update your payment information. Changes take effect immediately."
        }
      ]
    },
    {
      category: "Technical Support",
      items: [
        {
          question: "The app is running slowly, what should I do?",
          answer: "Try clearing your browser cache and cookies. If the issue persists, check your internet connection and try using a different browser. Contact support if problems continue."
        },
        {
          question: "I can't upload photos of my crops",
          answer: "Ensure your images are in JPG, PNG, or GIF format and under 5MB each. Try using a different browser or device. If you're on mobile, check that the app has camera permissions."
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive a reset link within a few minutes. Check your spam folder if you don't see the email."
        }
      ]
    }
  ];

  const tutorials = [
    {
      title: "Getting Started with GreenLoop",
      duration: "5 min",
      type: "Video",
      description: "Complete walkthrough of setting up your account and first farm profile",
      level: "Beginner"
    },
    {
      title: "Listing Your First Product",
      duration: "8 min",
      type: "Video",
      description: "Step-by-step guide to creating effective product listings in the marketplace",
      level: "Beginner"
    },
    {
      title: "Understanding Analytics",
      duration: "12 min",
      type: "Video",
      description: "Learn how to read your dashboard analytics and improve your sales",
      level: "Intermediate"
    },
    {
      title: "Advanced Marketing Strategies",
      duration: "15 min",
      type: "Video",
      description: "Tips and tricks for maximizing your crop sales and building customer relationships",
      level: "Advanced"
    },
    {
      title: "Mobile App Usage Guide",
      duration: "6 min",
      type: "Guide",
      description: "How to use GreenLoop on your mobile device for field updates",
      level: "Beginner"
    },
    {
      title: "Seasonal Planning Worksheet",
      duration: "3 min",
      type: "Download",
      description: "PDF template for planning your crop seasons and marketplace strategy",
      level: "All Levels"
    }
  ];

  const filteredFAQs = faqItems.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <>
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-zinc-900">Help Center</h1>
          <p className="text-sm text-zinc-600">Find answers and get support</p>
        </div>
      </div>

      <div className="p-6">
        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help articles, FAQs, or tutorials..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No FAQs found matching your search.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredFAQs.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Badge variant="outline">{category.category}</Badge>
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {category.items.map((item, itemIndex) => (
                            <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                              <AccordionTrigger className="text-left">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Tutorials & Guides
                </CardTitle>
                <CardDescription>
                  Step-by-step guides to help you get the most out of GreenLoop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tutorials.map((tutorial, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {tutorial.type === "Video" && <Play className="w-4 h-4 text-blue-600" />}
                            {tutorial.type === "Guide" && <FileText className="w-4 h-4 text-green-600" />}
                            {tutorial.type === "Download" && <Download className="w-4 h-4 text-purple-600" />}
                            <Badge variant="outline" className="text-xs">
                              {tutorial.type}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tutorial.duration}
                          </span>
                        </div>
                        <h4 className="font-medium mb-2">{tutorial.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant={
                            tutorial.level === "Beginner" ? "default" :
                            tutorial.level === "Intermediate" ? "secondary" :
                            tutorial.level === "Advanced" ? "destructive" : "outline"
                          }>
                            {tutorial.level}
                          </Badge>
                          <Button size="sm" variant="outline">
                            {tutorial.type === "Download" ? "Download" : "Watch"}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Get in Touch
                  </CardTitle>
                  <CardDescription>
                    Multiple ways to reach our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">info@greenloop.com</p>
                      <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+9779868597841</p>
                      <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM NPT</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                      <Button size="sm" className="mt-2">Start Chat</Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <Users className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Community Forum</p>
                      <p className="text-sm text-muted-foreground">Get help from other farmers</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Visit Forum
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Ticket Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LifeBuoy className="w-5 h-5" />
                    Submit Support Ticket
                  </CardTitle>
                  <CardDescription>
                    Describe your issue and we'll help you resolve it
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticketSubject">Subject</Label>
                    <Input id="ticketSubject" placeholder="Brief description of your issue" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticketCategory">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="marketplace">Marketplace</SelectItem>
                        <SelectItem value="payments">Payments & Billing</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticketPriority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticketDescription">Description</Label>
                    <Textarea
                      id="ticketDescription"
                      placeholder="Please provide detailed information about your issue..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button onClick={handleSubmitTicket} className="w-full">
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete guides and API documentation
                  </p>
                  <Button variant="outline" className="w-full">
                    View Docs
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Mobile App
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download our mobile app for iOS and Android
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      App Store
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Google Play
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check the current status of our services
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">All systems operational</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Status Page
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other farmers and share experiences
                  </p>
                  <Button variant="outline" className="w-full">
                    Join Community
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Blog
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Latest updates, tips, and farming insights
                  </p>
                  <Button variant="outline" className="w-full">
                    Read Blog
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Webinars
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Live and recorded training sessions
                  </p>
                  <Button variant="outline" className="w-full">
                    View Webinars
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Help;
