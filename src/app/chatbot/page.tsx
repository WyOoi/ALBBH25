"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  folderId: string | null;
}

interface ChatFolder {
  id: string;
  name: string;
  createdAt: Date;
}

export default function Chatbot() {
  const { t, language } = useLanguage();
  const [message, setMessage] = useState('');
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [folders, setFolders] = useState<ChatFolder[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showMoveMenu, setShowMoveMenu] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get the current chat session
  const currentChat = chatSessions.find(chat => chat.id === currentChatId);

  // Create a new folder
  const createNewFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder: ChatFolder = {
      id: Date.now().toString(),
      name: newFolderName.trim(),
      createdAt: new Date()
    };
    
    setFolders(prev => [...prev, newFolder]);
    setNewFolderName('');
    setIsCreatingFolder(false);
  };

  // Initialize folders from localStorage
  useEffect(() => {
    const storedFolders = localStorage.getItem('chatFolders');
    if (storedFolders) {
      try {
        const parsedFolders = JSON.parse(storedFolders);
        setFolders(parsedFolders.map((folder: any) => ({
          ...folder,
          createdAt: new Date(folder.createdAt)
        })));
      } catch (err) {
        console.error('Error parsing stored folders:', err);
      }
    }
  }, []);

  // Save folders to localStorage whenever they change
  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem('chatFolders', JSON.stringify(folders));
    }
  }, [folders]);

  // Update the createNewChat function to include folderId
  const createNewChat = (folderId?: string) => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: t("chatbot.new_chat_title"),
      messages: [
        { role: 'assistant', content: t("chatbot.greeting") }
      ],
      createdAt: new Date(),
      folderId: folderId || null
    };

    setChatSessions(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
  };

  // Initialize chat sessions from localStorage or create a new one
  useEffect(() => {
    const storedSessions = localStorage.getItem('chatSessions');
    
    if (storedSessions) {
      try {
        const parsedSessions = JSON.parse(storedSessions);
        
        // Convert string dates back to Date objects
        const formattedSessions = parsedSessions.map((session: any) => ({
          ...session,
          messages: session.messages.map((msg: ChatMessage) => ({
            ...msg,
          })),
          createdAt: new Date(session.createdAt)
        }));
        
        setChatSessions(formattedSessions);
        
        // Set current chat to the most recent one
        if (formattedSessions.length > 0) {
          setCurrentChatId(formattedSessions[0].id);
        } else {
          createNewChat();
        }
      } catch (err) {
        console.error('Error parsing stored chat sessions:', err);
        createNewChat();
      }
    } else {
      createNewChat();
    }
  }, []);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    }
  }, [chatSessions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  // Update chat title based on first user message
  const updateChatTitle = (userMessageContent: string) => {
    if (!currentChatId) return;
    
    const newTitle = userMessageContent.length > 30 
      ? userMessageContent.substring(0, 30) + '...' 
      : userMessageContent;
    
    setChatSessions(prev => 
      prev.map(chat => 
        chat.id === currentChatId && chat.title === t("chatbot.new_chat_title")
          ? { ...chat, title: newTitle } 
          : chat
      )
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '' || !currentChat) return;
    setError("");

    // Add user message to chat
    const userMessage: ChatMessage = { role: 'user', content: message };
    const isFirstUserMessage = currentChat.messages.length === 1;
    
    // Update the current chat session with the new user message
    setChatSessions(prev => 
      prev.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, userMessage] 
            } 
          : chat
      )
    );
    
    setMessage('');
    setIsTyping(true);
    
    // Update the chat title if this is the first user message
    if (isFirstUserMessage) {
      updateChatTitle(message);
    }
    
    // Format messages for API (exclude the first greeting from assistant for better context handling)
    const apiMessages = currentChat.messages.slice(1).concat(userMessage);
    
    try {
      // Call our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || t("chatbot.error.api_fail"));
      }
      
      if (data.success) {
        // Add AI response to the current chat
        setChatSessions(prev => 
          prev.map(chat => 
            chat.id === currentChatId 
              ? { 
                  ...chat, 
                  messages: [...chat.messages, { role: 'assistant', content: data.message }] 
                } 
              : chat
          )
        );
      } else {
        throw new Error(t("chatbot.error.api_unsuccessful"));
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage = err.message || t("chatbot.error.generic");
      setError(errorMessage);
      
      // Add error message to chat
      setChatSessions(prev => 
        prev.map(chat => 
          chat.id === currentChatId 
            ? { 
                ...chat, 
                messages: [...chat.messages, { 
                  role: 'assistant', 
                  content: t("chatbot.error") 
                }] 
              } 
            : chat
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const currentLocale = language === 'zh' ? 'zh-CN' : language; 

    if (date.toDateString() === today.toDateString()) {
      return t("chatbot.today");
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t("chatbot.yesterday");
    } else {
      return date.toLocaleDateString(currentLocale, { month: 'short', day: 'numeric' });
    }
  };

  // Group chat sessions by date
  const groupedChats = chatSessions.reduce((groups: Record<string, ChatSession[]>, chat) => {
    const dateKey = formatDate(chat.createdAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(chat);
    return groups;
  }, {});

  // Switch to a different chat
  const switchChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  // Add move chat function
  const moveChatToFolder = (chatId: string, folderId: string | null) => {
    setChatSessions(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, folderId } 
          : chat
      )
    );
    setShowMoveMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <div className="flex h-screen">
        {/* Left sidebar */}
        <div className="w-64 bg-[#202123] p-4 hidden md:block">
          <div className="font-semibold mb-6 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="bg-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                  <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .714-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
                </svg>
              </span>
              {t("app.name")} AI
            </Link>
          </div>
          
          <Link href="/" className="mb-4 w-full border border-white/20 rounded-md p-3 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Go to Homepage
          </Link>
          
          <button 
            onClick={() => createNewChat()}
            className="w-full border border-white/20 rounded-md p-3 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New chat
          </button>

          <button 
            onClick={() => setIsCreatingFolder(true)}
            className="w-full border border-white/20 rounded-md p-3 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            New folder
          </button>

          {isCreatingFolder && (
            <div className="mb-4 p-2 border border-white/20 rounded-md">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Folder name"
                className="w-full bg-[#2f2f2f] border border-white/20 rounded-md px-3 py-2 text-sm mb-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    createNewFolder();
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={createNewFolder}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setIsCreatingFolder(false);
                    setNewFolderName('');
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-8 h-[calc(100vh-280px)] overflow-y-auto">
            {folders.map(folder => (
              <div key={folder.id} className="mb-4">
                <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                  {folder.name}
                </div>
                {chatSessions
                  .filter(chat => chat.folderId === folder.id)
                  .map(chat => (
                    <div 
                      key={chat.id} 
                      className={`text-sm cursor-pointer p-2 rounded mb-1 flex items-center justify-between group ${
                        chat.id === currentChatId 
                          ? 'bg-[#343541] text-white' 
                          : 'hover:bg-white/10 text-gray-300'
                      } transition-colors`}
                    >
                      <div 
                        onClick={() => switchChat(chat.id)}
                        className="flex items-center gap-2 flex-1 truncate"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        <span className="truncate">{chat.title}</span>
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMoveMenu(showMoveMenu === chat.id ? null : chat.id);
                          }}
                          className="p-1 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                          </svg>
                        </button>
                        {showMoveMenu === chat.id && (
                          <div 
                            className="absolute right-0 mt-1 w-48 bg-[#2f2f2f] rounded-md shadow-lg z-10 border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="py-1">
                              <div className="px-3 py-2 text-xs text-gray-400">Move to folder</div>
                              <button
                                onClick={() => moveChatToFolder(chat.id, null)}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                              >
                                Unorganized
                              </button>
                              {folders.map(folder => (
                                <button
                                  key={folder.id}
                                  onClick={() => moveChatToFolder(chat.id, folder.id)}
                                  className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                                >
                                  {folder.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
            
            {/* Unorganized chats */}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2">Unorganized</div>
              {chatSessions
                .filter(chat => !chat.folderId)
                .map(chat => (
                  <div 
                    key={chat.id} 
                    className={`text-sm cursor-pointer p-2 rounded mb-1 flex items-center justify-between group ${
                      chat.id === currentChatId 
                        ? 'bg-[#343541] text-white' 
                        : 'hover:bg-white/10 text-gray-300'
                    } transition-colors`}
                  >
                    <div 
                      onClick={() => switchChat(chat.id)}
                      className="flex items-center gap-2 flex-1 truncate"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                      <span className="truncate">{chat.title}</span>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMoveMenu(showMoveMenu === chat.id ? null : chat.id);
                        }}
                        className="p-1 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </button>
                      {showMoveMenu === chat.id && (
                        <div 
                          className="absolute right-0 mt-1 w-48 bg-[#2f2f2f] rounded-md shadow-lg z-10 border border-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="py-1">
                            <div className="px-3 py-2 text-xs text-gray-400">Move to folder</div>
                            <button
                              onClick={() => moveChatToFolder(chat.id, null)}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                            >
                              Unorganized
                            </button>
                            {folders.map(folder => (
                              <button
                                key={folder.id}
                                onClick={() => moveChatToFolder(chat.id, folder.id)}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                              >
                                {folder.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col max-h-screen">
          <header className="border-b border-white/10 p-2 flex items-center justify-between">
            <div className="text-sm hidden md:block">{t("app.name")} {t("chatbot.title_suffix")}</div>
            <div className="md:hidden flex-1 flex items-center justify-between">
              <button className="p-2 hover:bg-white/10 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => createNewChat()}
                  className="p-2 hover:bg-white/10 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <Link href="/" className="p-2 hover:bg-white/10 rounded-md flex items-center gap-1 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  Home
                </Link>
              </div>
            </div>
          </header>
          
          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {currentChat?.messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3xl rounded-lg px-4 py-2 ${
                    msg.role === 'user' 
                      ? 'bg-[#343541] text-white' 
                      : 'bg-[#444654] text-white'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {msg.role === 'user' ? 'U' : 'AI'}
                    </div>
                    <div>
                      {msg.content.split('\n').map((line, i) => (
                        <p key={i} className={line.startsWith('### ') ? 'text-lg font-semibold mt-2 mb-1' : line.startsWith('## ') ? 'text-xl font-bold mt-3 mb-1' : line.startsWith('# ') ? 'text-2xl font-extrabold mt-4 mb-2' : ''}>
                          {line.replace(/^#+\s*/, '')}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#444654] text-white rounded-lg px-4 py-2">
                  <div className="flex items-start">
                    <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      AI
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef}></div>
          </div>
          
          {/* Error display */}
          {error && (
            <div className="p-4 border-t border-red-500/30 bg-red-500/10 text-red-300 text-sm">
              <strong>{t("chatbot.error_occurred")}:</strong> {error}
            </div>
          )}

          {/* Message input area */}
          <div className="border-t border-white/10 p-4 bg-[#1e1e1e]">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any); // Type assertion needed for form event
                  }
                }}
                placeholder={t("chatbot.placeholder")} 
                className="flex-1 bg-[#2f2f2f] border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 text-sm text-gray-200 resize-none focus:outline-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent" 
                rows={1} 
              />
              <button 
                type="submit" 
                disabled={isTyping || message.trim() === ''}
                className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg focus:outline-none transition-colors h-full"
                style={{maxHeight: '46px'}} // Ensure button height matches textarea
              >
                {isTyping ? t("chatbot.sending") : t("chatbot.send")}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center">{t("chatbot.disclaimer")}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 