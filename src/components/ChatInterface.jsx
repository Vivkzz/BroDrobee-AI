
import { useState, useRef, useEffect } from 'react';
import { useUser } from '../App.tsx';
import { generateRecommendation } from '../utils/clothingRecommender';
import { useWardrobeData } from '../hooks/useWardrobeData';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hi there! I can help you find the perfect outfit for any occasion. Just let me know what you need!', items: [] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { styleProfile, user } = useUser();
  const { wardrobe } = useWardrobeData(user);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', content: input, items: [] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Generate recommendation based on user message
      const recommendation = await generateRecommendation(input, styleProfile, wardrobe);
      
      // Add AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'system', 
          content: recommendation.text,
          items: recommendation.items || []
        }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating recommendation:', error);
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: 'Sorry, I had trouble generating a recommendation. Please try again.',
        items: []
      }]);
      setIsTyping(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-fashion-purple text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <div>{message.content}</div>
              
              {message.items && message.items.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {message.items.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs mt-1 text-center">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="fashion-input flex-1 py-2 px-3"
            placeholder="Ask for outfit recommendations..."
          />
          <button 
            type="submit"
            className="fashion-button ml-2 px-4 py-2"
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
