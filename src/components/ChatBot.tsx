
import React, { useState } from 'react';
import { MessageCircle, X, Send, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello There!',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Thank you for the chat!\nYour reviews help us grow.\nDo you like our service?',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '3',
      text: 'Welcome to IMEPAY\nhow can we help you?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! This is a demo response. In a real implementation, this would connect to an AI service.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
          
          {/* Animated Farmer Character */}
          <div className="absolute -top-16 -left-8 animate-bounce">
            <div className="relative w-16 h-16">
              {/* Farmer Character */}
              <div className="w-full h-full relative">
                {/* Hat */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-yellow-600 rounded-full"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-yellow-700 rounded-full"></div>
                
                {/* Head */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-200 rounded-full border-2 border-orange-300">
                  {/* Eyes */}
                  <div className="absolute top-2 left-1.5 w-1 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-2 right-1.5 w-1 h-1 bg-black rounded-full"></div>
                  {/* Smile */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-1.5 border-b-2 border-brown-600 rounded-full"></div>
                </div>
                
                {/* Body */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-lg"></div>
                
                {/* Waving Hand */}
                <div className="absolute top-6 right-1 w-2 h-2 bg-orange-200 rounded-full animate-pulse transform rotate-12"></div>
              </div>
              
              {/* Speech Bubble */}
              <div className="absolute -top-8 -left-4 bg-white rounded-lg px-2 py-1 shadow-lg border animate-fade-in">
                <div className="text-xs font-medium text-gray-800">Hi! 👋</div>
                <div className="absolute bottom-0 left-4 transform translate-y-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-96 h-[600px] shadow-xl animate-fade-in bg-white rounded-2xl overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="font-medium text-sm">Chat with AgriBot</p>
                <p className="text-xs text-emerald-100">Your farming assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {/* Welcome Section with Farmer Character */}
          <div className="bg-gradient-to-b from-emerald-50 to-white p-4 border-b flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Static Farmer Character in Chat */}
              <div className="w-12 h-12 relative flex-shrink-0">
                {/* Hat */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-2.5 bg-yellow-600 rounded-full"></div>
                <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1.5 bg-yellow-700 rounded-full"></div>
                
                {/* Head */}
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-orange-200 rounded-full border border-orange-300">
                  {/* Eyes */}
                  <div className="absolute top-1.5 left-1 w-1 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-1.5 right-1 w-1 h-1 bg-black rounded-full"></div>
                  {/* Smile */}
                  <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 w-2.5 h-1 border-b border-amber-700 rounded-full"></div>
                </div>
                
                {/* Body */}
                <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-5 h-4 bg-gray-400 rounded"></div>
              </div>
              
              <div>
                <p className="font-medium text-emerald-800">Welcome to AgriBot! 🌾</p>
                <p className="text-sm text-emerald-600">I'm here to help with all your farming needs</p>
              </div>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 max-w-xs shadow-sm">
                      <p className="text-sm text-gray-800 whitespace-pre-line">{message.text}</p>
                      {index === messages.length - 1 && (
                        <p className="text-xs text-gray-400 mt-1">11:31</p>
                      )}
                    </div>
                  </div>
                )}
                {message.isUser && (
                  <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-xs shadow-sm">
                    <p className="text-sm">{message.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="border-t bg-white p-4 flex-shrink-0">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about farming..."
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-500 py-1"
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-gray-600"
                >
                  <span className="text-lg">📎</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-gray-600"
                >
                  <span className="text-lg">😊</span>
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="icon"
                  className="h-8 w-8 bg-emerald-500 hover:bg-emerald-600 rounded-full disabled:opacity-50"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
