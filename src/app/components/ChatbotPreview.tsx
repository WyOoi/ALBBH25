"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatbotPreview() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Virtual Learning Assistant. How can I help you today?' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    
    // Redirect to full chatbot page for a more complete experience
    router.push('/chatbot');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
      <div className="bg-indigo-600 text-white px-4 py-3">
        <h3 className="text-lg font-medium">AI Learning Assistant</h3>
        <p className="text-xs text-indigo-200">Powered by Qwen-Max</p>
      </div>
      
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs rounded-lg px-4 py-2 ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-center">
            <p className="text-sm text-gray-600">Try the full chatbot experience</p>
            <button 
              onClick={() => router.push('/chatbot')}
              className="mt-2 text-indigo-600 text-sm font-medium hover:text-indigo-800"
            >
              Go to Chatbot →
            </button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask any learning question..."
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
    </div>
  );
} 