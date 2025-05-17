import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ChatbotPreview from './components/ChatbotPreview';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Experience Our AI-Powered Chatbot
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get personalized assistance with your learning journey using our intelligent virtual assistant.
            </p>
          </div>
          
          <ChatbotPreview />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
