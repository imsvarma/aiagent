import React from 'react';
import { Chatbot } from './components/Chatbot';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = (
    <>
      <a href="#" className="block md:inline-block px-3 py-2 rounded-md hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
      <a href="#" className="block md:inline-block px-3 py-2 rounded-md hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
      <a href="#" className="block md:inline-block px-3 py-2 rounded-md hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
      <a href="#" className="block md:inline-block px-3 py-2 rounded-md hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800">
      {/* Header */}
      <header className="w-full bg-white dark:bg-gray-900/80 backdrop-blur-sm shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">YourBrand</a>
            <nav className="hidden md:flex space-x-4">
              {navLinks}
            </nav>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 dark:text-gray-200 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <nav className="flex flex-col space-y-2">
                {navLinks}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12 md:py-20 text-center flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            Welcome to the Future of <span className="text-indigo-600 dark:text-indigo-400">Customer Interaction</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            This is a simple website template featuring an AI-powered chatbot in the bottom right corner. Engage with your users like never before.
          </p>
          <a
            href="#"
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Get Started
          </a>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-gray-900 shadow-inner py-6">
        <div className="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 YourBrand. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};