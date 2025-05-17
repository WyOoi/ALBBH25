"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLanguage, Language } from "../contexts/LanguageContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setLanguageMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!languageMenuOpen) return;

      const targetNode = event.target as Node;

      const isInsideDesktop = desktopDropdownRef.current && desktopDropdownRef.current.contains(targetNode);
      const isInsideMobile = mobileDropdownRef.current && mobileDropdownRef.current.contains(targetNode);

      if (!isInsideDesktop && !isInsideMobile) {
        setLanguageMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageMenuOpen]);

  // Language options
  const languageOptions = [
    { code: 'en', label: 'GB', name: t("language.option.english") },
    { code: 'ms', label: 'MY', name: t("language.option.malay") },
    { code: 'zh', label: 'CN', name: t("language.option.chinese") }
  ];

  const currentLanguage = languageOptions.find(option => option.code === language);

  const navigation = [
    { nameKey: "nav.home", href: "/" },
    { nameKey: "nav.chatbot", href: "/chatbot" },
    { nameKey: "nav.note", href: "/note" },
    { nameKey: "nav.study_plan", href: "/study-plan" },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-indigo-600 font-bold text-xl">{t("app.name.short")}</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {/* <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              {t("nav.dashboard")}
            </Link> */}
            <Link href="/chatbot" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              {t("nav.chatbot")}
            </Link>
            <Link href="/note" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              {t("nav.note")}
            </Link>
            <Link href="/study-plan" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              {t("nav.study_plan")}
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              {t("nav.login")}
            </Link>
            <Link href="/register" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm font-medium rounded-md">
              {t("nav.register")}
            </Link>
            
            {/* Language selector - desktop */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center text-gray-700 px-2 py-1 text-sm font-medium rounded-md border border-gray-300 hover:border-gray-400"
              >
                <span className="mr-1">{currentLanguage?.label}</span>
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 py-1 overflow-hidden">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code as Language)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center ${language === option.code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="w-8 font-medium text-indigo-600">{option.label}</span>
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button with language selector */}
          <div className="flex items-center sm:hidden">
            {/* Language selector - mobile */}
            <div className="relative mr-2" ref={mobileDropdownRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center text-gray-700 p-2 text-sm rounded-md border border-gray-300"
              >
                <span>{currentLanguage?.label}</span>
                <svg className="h-4 w-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 overflow-hidden">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code as Language)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center ${language === option.code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="w-8 font-medium text-indigo-600">{option.label}</span>
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{t("nav.open_main_menu")}</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {/* <Link href="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-indigo-400 hover:text-indigo-700">
              {t("nav.dashboard")}
            </Link> */}
            <Link href="/chatbot" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-indigo-400 hover:text-indigo-700">
              {t("nav.chatbot")}
            </Link>
            <Link href="/note" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-indigo-400 hover:text-indigo-700">
              {t("nav.note")}
            </Link>
            <Link href="/study-plan" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-indigo-400 hover:text-indigo-700">
              {t("nav.study_plan")}
            </Link>
            <Link href="/login" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-indigo-400 hover:text-indigo-700">
              {t("nav.login")}
            </Link>
            <Link href="/register" className="block pl-3 pr-4 py-2 border-l-4 border-indigo-600 text-indigo-700 bg-indigo-50">
              {t("nav.register")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 