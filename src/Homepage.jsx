import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/logo.png'
import carpetBefore from './assets/carpet-before.jpg'
import carpetAfter from './assets/carpet-after.jpg'
import roofBefore from './assets/roof-before.jpg'
import roofAfter from './assets/roof-after.jpg'
import windowBefore from './assets/window-before.jpg'
import windowAfter from './assets/window-after.jpg'

const AnimatedNumber = ({ value, duration = 2000, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const end = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
      const startTime = performance.now();

      const step = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentCount = Math.floor(progress * end);
        setCount(currentCount);

        if (progress < 1) requestAnimationFrame(step);
        else setCount(end);
      };

      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, duration, delay]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Homepage = () => {
  // Copy all your existing App component content here
  // This will include all state, effects, functions, and JSX
  // I'll just add the key routing changes

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentImageSet, setCurrentImageSet] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmExit, setShowConfirmExit] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [quoteFormData, setQuoteFormData] = useState({
    service: '',
    subServices: [],
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredContact: 'phone'
    },
    propertyDetails: {
      address: '',
      suburb: '',
      postcode: '',
      specialRequirements: ''
    },
    scheduling: {
      preferredDate: '',
      preferredTime: '',
      urgency: 'flexible'
    }
  })

  // ... rest of your App component content will be here
  // I'll just show the key navigation change

  return (
    <main className="min-h-screen bg-red-50 text-gray-800 overflow-x-hidden" role="main">
      {/* Navigation - with Careers link added */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-red-200/50' : 'bg-white/80 backdrop-blur-md'}`}>
        <div className="container mx-auto px-6">
          {/* Top bar content... */}
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <img
                  src={logo}
                  alt="Ilovah Cleaning Logo"
                  className="w-14 h-14 object-contain rounded-lg transition-shadow duration-300"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  <span className="text-red-600">Ilovah Cleaning</span>
                </h1>
                <p className="text-sm text-gray-500 -mt-1">Professional Cleaning Services</p>
              </div>
            </Link>

            {/* Clean Menu - with Careers link */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Team', 'Reviews', 'FAQ', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium relative group py-2"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
              <Link
                to="/careers"
                className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium relative group py-2"
              >
                Careers
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <button
                onClick={() => {/* your existing openQuoteModal */}}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Quote
              </button>
            </div>
          </div>

          {/* Mobile Menu - with Careers link */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-red-100">
              <div className="flex flex-col space-y-4 pt-4">
                {['Services', 'Team', 'Reviews', 'FAQ', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-red-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <Link
                  to="/careers"
                  className="text-gray-700 hover:text-red-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Careers
                </Link>
                <button
                  onClick={() => {/* your existing openQuoteModal */}}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 w-fit"
                >
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Rest of your existing content */}
      <div>This is a simplified version - your full App.jsx content will be copied here</div>
    </main>
  )
}

export default Homepage