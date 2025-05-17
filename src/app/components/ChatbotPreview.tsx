"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

export default function ChatbotPreview() {
  const router = useRouter();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: t("chatbot.greeting") },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Add user message to chat
    // For preview, we don't actually send to AI, just redirect
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    
    // Redirect to full chatbot page for a more complete experience
    router.push('/chatbot');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
      <div className="bg-indigo-600 text-white px-4 py-3">
        <h3 className="text-lg font-medium">{t("features.chatbot")}</h3>
        <p className="text-xs text-indigo-200">{t("chatbot.disclaimer").split('.')[0]}</p> {/* Show only first part of disclaimer */}
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
              {/* Render greeting directly if it's the initial message, otherwise it's user input */}
              {index === 0 && msg.role === 'assistant' ? msg.content : msg.content}
            </div>
          </div>
        ))}
        
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-center">
            <p className="text-sm text-gray-600">{t("chatbot.try_full_experience")}</p>
            <button 
              onClick={() => router.push('/chatbot')}
              className="mt-2 text-indigo-600 text-sm font-medium hover:text-indigo-800"
            >
              {t("nav.chatbot")} →
            </button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("chatbot.placeholder_preview")}
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {t("chatbot.send")}
        </button>
      </form>
    </div>
  );
} 