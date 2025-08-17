import React from 'react';
import { Chatbot } from './components/Chatbot';

const App: React.FC = () => {
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
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">YourBrand</div>
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
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              {navLinks}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="container mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white">
            Build The Future, <span className="text-indigo-600 dark:text-indigo-400">Today</span>.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            This is a simple, elegant website template. Use the chatbot in the corner to interact with our AI assistant, powered by your n8n workflow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#" className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105">
              Get Started
            </a>
            <a href="#" className="w-full sm:w-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-8 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform transform hover:scale-105">
              Learn More
            </a>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Feature One</h3>
                <p className="text-gray-600 dark:text-gray-400">A brief description of an amazing feature that will capture your audience's attention.</p>
            </div>
             <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Feature Two</h3>
                <p className="text-gray-600 dark:text-gray-400">Another compelling feature that showcases the value and quality of your product.</p>
            </div>
             <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Feature Three</h3>
                <p className="text-gray-600 dark:text-gray-400">The final feature to seal the deal and convince users that this is what they need.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900/80">
        <div className="container mx-auto px-6 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 YourBrand. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default App;