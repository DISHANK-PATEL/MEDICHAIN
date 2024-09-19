// src/MediChainWebsite.js

import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaRobot, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { RiHealthBookFill } from 'react-icons/ri';
import { AiFillInsurance } from 'react-icons/ai';
import { BsMicFill, BsSearch } from 'react-icons/bs';
import { MdFileUpload } from 'react-icons/md';

const MediChainWebsite = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      setChatMessages([...chatMessages, { text: userInput, isUser: true }]);
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { text: 'Thank you for your message. How can I assist you further?', isUser: false },
        ]);
      }, 1000);
      setUserInput('');
    }
  };

  const heroImages = [
     'https://img.freepik.com/free-photo/veterinary-lab-robe-standing-cowshed_1303-31048.jpg',
     'https://img.freepik.com/free-photo/veterinary-farm-walking-cowshed-checking-cows_1303-31170.jpg',
     'https://img.freepik.com/premium-photo/veterinary-farm-walking-cowshed-checking-cows_1303-31030.jpg',
    'https://img.freepik.com/free-photo/veterinary-cowshed-with-jug-milk_1303-30984.jpg',
    'https://img.freepik.com/free-photo/veterinary-farm-walking-cowshed-checking-cows_1303-31146.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721779200&semt=ais_user',
    'https://img.freepik.com/premium-photo/veterinarian-checks-cow-created-with-generative-ai-technology_132358-9952.jpg'
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: 'DISHANK PATEL', text: 'MEDICHAIN has revolutionized how I manage my health information.' },
    { name: 'ADITYA KRISHNA', text: 'The AI-powered symptom checker is incredibly accurate and helpful.' },
    { name: 'NISHANT KUMAR', text: 'I feel more secure knowing my medical data is protected on the blockchain.' },
    { name: 'HARSH SAHAY', text: 'The insurance integration feature has saved me time and money.' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">MEDICHAIN</span>
            </div>
            <div className="flex items-center">
              <a href="#features" className="text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#testimonials" className="text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Testimonials</a>
              <button
                onClick={toggleDarkMode}
                className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-black"
              >
                {isDarkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        {/* Hero image background */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${heroImages[currentHeroImage]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        {/* Hero text content */}
        <div className="relative z-10 text-center text-white px-4 md:px-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 shadow-lg">Welcome to MEDICHAIN</h1>
          <p className="text-xl md:text-2xl mb-8 shadow-lg">Revolutionizing Healthcare with Blockchain and AI</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105">
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<IoMdAnalytics className="h-12 w-12 text-blue-600" />}
              title="Medical Report Analyzer"
              description="AI-powered analysis of your medical reports for quick insights and recommendations."
            />
            <FeatureCard
              icon={<RiHealthBookFill className="h-12 w-12 text-green-600" />}
              title="Symptom Checker"
              description="Advanced symptom checker to help you understand potential health issues."
            />
            <FeatureCard
              icon={<AiFillInsurance className="h-12 w-12 text-purple-600" />}
              title="Insurance Integration"
              description="Seamless integration with insurance providers for efficient claim processing."
            />
            <FeatureCard
              icon={<BsMicFill className="h-12 w-12 text-red-600" />}
              title="Search via Audio and Text"
              description="Use voice or text to search for medical information and get instant results."
            />
            <FeatureCard
              icon={<MdFileUpload className="h-12 w-12 text-yellow-600" />}
              title="Upload Image and Ask"
              description="Upload medical images and ask questions to get AI-powered analysis and insights."
            />
            <FeatureCard
              icon={<BsSearch className="h-12 w-12 text-blue-600" />}
              title="Find Veterinary Services"
              description="Use our service to locate nearby veterinary hospitals and specialists for your livestock or pets."
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} name={testimonial.name} text={testimonial.text} />
            ))}
          </div>
        </section>
      </main>

      {/* Chatbot */}
      {isChatbotOpen && (
        <div className="fixed bottom-4 right-4 w-full max-w-sm bg-black dark:bg-gray-800 shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Chat with Us</h3>
            <button
              onClick={toggleChatbot}
              className="text-gray-400 hover:text-gray-200"
            >
              &times;
            </button>
          </div>
          <div className="overflow-y-auto h-64 mb-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg ${message.isUser ? 'bg-blue-600 text-white self-end' : 'bg-gray-700 text-white self-start'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>&copy; 2024 MEDICHAIN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-center text-blue-600 dark:text-blue-400">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-center">{description}</p>
  </div>
);

const TestimonialCard = ({ name, text }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <p className="text-gray-600 dark:text-gray-400">{text}</p>
    <p className="mt-4 text-right font-semibold text-blue-600 dark:text-blue-400">- {name}</p>
  </div>
);

export default MediChainWebsite;
