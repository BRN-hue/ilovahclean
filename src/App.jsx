import React, { useState, useEffect } from 'react'
import logo from './assets/logo.png'

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


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmExit, setShowConfirmExit] = useState(false)
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
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const openQuoteModal = (selectedService = '') => {
    setIsQuoteModalOpen(true)
    setCurrentStep(1)
    // Reset form data
    setQuoteFormData({
      service: selectedService,
      subServices: [],
      contactInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredContact: 'phone'
      },
      propertyDetails: {
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        address: '',
        suburb: '',
        postcode: '',
        specialRequirements: ''
      },
      scheduling: {
        selectedDate: '',
        selectedTimeSlot: '',
        urgency: 'flexible'
      }
    })
  }

  // Calendar helper functions
  const getCurrentDate = () => new Date()
  const getStartOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)
  const getEndOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const getDaysInMonth = (date) => getEndOfMonth(date).getDate()
  const getFirstDayOfMonth = (date) => getStartOfMonth(date).getDay()

  const [currentCalendarDate, setCurrentCalendarDate] = useState(getCurrentDate())

  // Generate available time slots for each day
  const generateTimeSlots = (date) => {
    // Safety check for invalid date
    if (!date || isNaN(date.getTime())) {
      return {
        morning: [],
        afternoon: []
      }
    }
    
    const slots = {
      morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
      afternoon: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
    }

    // Use date as seed for consistent availability
    const dayOfWeek = date.getDay()
    const dayOfMonth = date.getDate()

    // Weekend has fewer slots
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        morning: slots.morning.slice(0, 2),
        afternoon: slots.afternoon.slice(0, 2)
      }
    }

    // Use day of month to create consistent but varied availability
    const seed = dayOfMonth % 7 // Creates a pattern based on day of month

    // Different patterns based on seed value
    switch (seed) {
      case 0:
        return {
          morning: slots.morning.slice(0, 3), // All morning slots
          afternoon: slots.afternoon.slice(0, 3) // 3 afternoon slots
        }
      case 1:
        return {
          morning: slots.morning.slice(0, 2), // 2 morning slots
          afternoon: slots.afternoon.slice(0, 4) // All afternoon slots
        }
      case 2:
        return {
          morning: slots.morning.slice(0, 3), // All morning slots
          afternoon: slots.afternoon.slice(0, 2) // 2 afternoon slots
        }
      case 3:
        return {
          morning: slots.morning.slice(0, 1), // 1 morning slot
          afternoon: slots.afternoon.slice(0, 3) // 3 afternoon slots
        }
      case 4:
        return {
          morning: slots.morning.slice(0, 2), // 2 morning slots
          afternoon: slots.afternoon.slice(0, 3) // 3 afternoon slots
        }
      case 5:
        return {
          morning: slots.morning.slice(0, 3), // All morning slots
          afternoon: slots.afternoon.slice(0, 1) // 1 afternoon slot
        }
      case 6:
        return {
          morning: [], // No morning slots
          afternoon: slots.afternoon.slice(0, 4) // All afternoon slots
        }
      default:
        return {
          morning: slots.morning.slice(0, 2),
          afternoon: slots.afternoon.slice(0, 2)
        }
    }
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const isDatePast = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isDateSelected = (date) => {
    if (!quoteFormData.scheduling.selectedDate) {
      return false
    }
    return formatDate(date) === quoteFormData.scheduling.selectedDate
  }

  const closeQuoteModal = () => {
    // Check if user has made any progress (past step 1 or has entered any data)
    const hasProgress = currentStep > 1 || 
      quoteFormData.service || 
      quoteFormData.contactInfo.firstName || 
      quoteFormData.contactInfo.lastName || 
      quoteFormData.contactInfo.email || 
      quoteFormData.contactInfo.phone || 
      quoteFormData.propertyDetails.propertyType || 
      quoteFormData.propertyDetails.postcode || 
      quoteFormData.scheduling.selectedDate
    
    if (hasProgress) {
      setShowConfirmExit(true)
    } else {
      // No progress made, close directly
      actuallyCloseModal()
    }
  }

  const actuallyCloseModal = () => {
    setIsQuoteModalOpen(false)
    setCurrentStep(1)
    setShowConfirmExit(false)
  }

  const cancelExit = () => {
    setShowConfirmExit(false)
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (section, field, value) => {
    setQuoteFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const updateRootFormData = (field, value) => {
    setQuoteFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Scroll to top function with bouncing animation
  const scrollToTop = () => {
    setIsScrolling(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    // Reset animation state after scroll completes
    setTimeout(() => {
      setIsScrolling(false)
    }, 800)
  }

  const [showDetails, setShowDetails] = useState({})
  
  const toggleDetails = (serviceIndex) => {
    setShowDetails(prev => ({
      ...prev,
      [serviceIndex]: !prev[serviceIndex]
    }))
  }

  const services = [
    {
      title: "End of Lease Cleaning",
      description: "Bond Back Guarantee: We promise to promptly address and rectify any cleaning issues your property manager identifies during the final inspection, ensuring your bond is secured.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-red-500 to-red-600",
      features: ["Bond back guarantee", "Property manager inspections", "Professional equipment"]
    },
    {
      title: "Pressure Washing",
      description: "Professional pressure washing for buildings, walkways, and common areas. Ideal for property managers, clinics, and commercial spaces.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-red-500 to-red-600",
      features: ["Commercial spaces", "Property managers", "Professional grade equipment"]
    },
    {
      title: "Pest Management Service",
      description: "Service coming soon",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-red-500 to-red-600",
      features: ["Coming soon", "Professional service", "Comprehensive solutions"]
    },
    {
      title: "Carpet Cleaning",
      description: "Deep-cleaning that removes dirt, stains, and allergens using professional equipment and eco-friendly solutions. Ideal for homes, offices, and rentals.",
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-red-500 to-red-600",
      features: ["Deep cleaning", "Eco-friendly solutions", "Professional equipment"]
    },
    {
      title: "Window Cleaning",
      description: "Crystal-clear windows inside and out. We remove dirt, spots, and streaks for a spotless finish that brightens your home or business.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-red-500 to-red-600",
      features: ["Interior & exterior", "Spotless finish", "Home & business"]
    },
    {
      title: "Gutter Cleaning",
      description: "Protect your property with precision. Our discreet, thorough gutter cleaning ensures seamless drainage and lasting curb appeal.",
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-red-500 to-red-600",
      features: ["Property protection", "Seamless drainage", "Curb appeal enhancement"]
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Toowoomba City",
      text: "I can't get enough of their window cleaning service! The professional service made a huge difference in the ambiance of my home.",
      service: "Window Cleaning",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face&auto=format&q=75"
    },
    {
      name: "Michael Lee",
      location: "Hodgson Vale QLD",
      text: "The carpet cleaning service exceeded my expectations. My carpets look brand new, and the fresh scent lingers for days.",
      service: "Carpet Cleaning",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format&q=75"
    },
    {
      name: "Emily White",
      location: "Middle Ridge",
      text: "I'm impressed by the effectiveness of their pest control service. A pest-free home has made a huge difference in our daily lives.",
      service: "Pest Control",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format&q=75"
    },
    {
      name: "Daniel Brown",
      location: "Helidon",
      text: "The end of lease cleaning service was thorough and efficient. It made the moving process much smoother.",
      service: "End of Lease",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format&q=75"
    }
  ]

  return (
    <main className="min-h-screen bg-red-50 text-gray-800 overflow-x-hidden" role="main">
      {/* Hero Background Image */}
      <div
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=800&fit=crop&auto=format&q=60)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(239,68,68,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(59,130,246,0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Professional Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-red-200/50' : 'bg-white/80 backdrop-blur-md'
        }`}>
        <div className="container mx-auto px-6">
          {/* Top bar with contact info */}
          <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-red-100">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                4 Kelfield Street, North Toowoomba QLD, Australia
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Mon-Sun: 7AM-7PM
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (04) 7871 1829
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                ilovahcleaning@gmail.com
              </span>
            </div>
          </div>

          {/* Main navigation */}
          <div className="flex justify-between items-center py-4">
            {/* Professional Logo */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <img
                  src={logo}
                  alt="Ilovah Cleaning Logo"
                  className="w-14 h-14 object-contain rounded-lg transition-shadow duration-300"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  <span className="text-red-600">
                    Ilovah Cleaning
                  </span>
                </h1>
                <p className="text-sm text-gray-500 -mt-1">Professional Cleaning Services</p>
              </div>
            </div>

            {/* Clean Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium relative group py-2"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
              <button
                onClick={openQuoteModal}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-red-600 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-red-100">
              <div className="flex flex-col space-y-4 pt-4">
                {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-red-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button
                  onClick={openQuoteModal}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 w-fit"
                >
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section with Background Image */}
      <section className="relative pt-24 pb-16 overflow-hidden sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/50"></div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">

            {/* Professional Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-red-200 rounded-full px-4 py-2 mb-6 sm:px-6 sm:py-2 shadow-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                Professional • Reliable • Trusted Since 2020
              </span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-snug sm:leading-tight mb-4 sm:mb-6">
              <span className="text-gray-800">Spotless Solutions,</span>
              <br />
              <span className="text-red-600">
                Lovingly Delivered
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto">
              Delivering comprehensive home cleaning services tailored for you and your family—
              <span className="text-red-700 font-semibold"> always reliable, always smiling.</span>
            </p>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 text-gray-700 text-xs sm:text-sm md:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              <span className="truncate">4 Kelfield Street, North Toowoomba QLD, Australia</span>
            </div>


            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
              <button
                onClick={openQuoteModal}
                className="group px-8 sm:px-10 py-3 sm:py-4 bg-red-500 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
              >
                Get Free Quote Today
                <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>

              <a href="tel:0478711829">
                <button className="px-8 sm:px-10 py-3 sm:py-4 bg-white border-2 border-red-300 text-red-700 rounded-xl font-semibold text-base sm:text-lg hover:bg-red-50 hover:border-red-400 transition-all duration-300 shadow-md hover:shadow-lg">
                  Call (04) 7871 1829
                </button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-2xl mx-auto">
              <div className="flex-1 text-center min-w-[80px]">
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">
                  <AnimatedNumber value={1000} suffix="+" delay={2000} duration={5000} />
                </div>
                <div className="text-sm text-gray-600">Satisfied Customers</div>
              </div>
              <div className="flex-1 text-center min-w-[80px]">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                  <AnimatedNumber value={99.9} suffix="%" delay={2000} duration={4000} />
                </div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="flex-1 text-center min-w-[80px]">
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">
                  <span><AnimatedNumber value={5} suffix="/5" delay={2000} duration={3000} /><svg className="w-5 h-5 inline-block ml-1 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></span>
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>



          </div>
        </div>
      </section>



      {/* Enhanced Services Section with Real Images */}
      <section id="services" className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 px-3 sm:px-6 lg:px-8">
            <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Services
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Comprehensive Cleaning Solutions
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From regular maintenance to specialized deep cleans, we offer professional services to keep your space pristine
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 w-full">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden shadow-lg hover:shadow-2xl border border-red-100 hover:border-red-200 transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay - consistent darker overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
                  {/* Badge pinned exactly to edge, slightly bigger */}
                  <div className="absolute top-0 right-0">
                    <span
                      className={`px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r ${service.gradient} text-white text-xs sm:text-sm font-bold shadow-md rounded-bl-lg`}
                    >
                      <span className="hidden sm:inline">Professional Service</span>
                      <span className="sm:hidden">Pro</span>
                    </span>
                  </div>

                  {/* Main Text */}
                  <div className="text-white mt-auto">
                    <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-3 drop-shadow-lg leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-white/95 mb-2 sm:mb-6 leading-snug sm:leading-relaxed drop-shadow-md text-xs sm:text-sm md:text-base line-clamp-3 sm:line-clamp-none">
                      {service.description}
                    </p>

                    {/* Button - always visible */}
                    <button
                      onClick={() => openQuoteModal(service.title)}
                      className="w-full py-2 sm:py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 hover:shadow-lg transform hover:scale-105 text-xs sm:text-sm transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-gray-800"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&h=600&fit=crop&crop=center&auto=format&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gray-900/70"></div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              How It Works
            </h2>
          </div>

          {/* Steps Flow */}
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-start gap-3 sm:gap-4 md:gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="text-center text-white min-w-0 flex-1 max-w-xs">
                <div className="w-14 h-14 mx-auto mb-3 border-2 border-white/50 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">Select the service</h3>
                <p className="text-white/80 text-xs sm:text-sm leading-tight">that fits your needs.</p>
              </div>

              {/* Arrow 1 */}
              <div className="hidden sm:flex items-center pt-7">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="text-center text-white min-w-0 flex-1 max-w-xs">
                <div className="w-14 h-14 mx-auto mb-3 border-2 border-white/50 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">Get an Instant Quote</h3>
                <p className="text-white/80 text-xs sm:text-sm leading-tight">or Book Online</p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden sm:flex items-center pt-7">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="text-center text-white min-w-0 flex-1 max-w-xs">
                <div className="w-14 h-14 mx-auto mb-3 border-2 border-white/50 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">We do the work</h3>
                <p className="text-white/80 text-xs sm:text-sm leading-tight italic">Our friendly team gets the job done right.</p>
              </div>

              {/* Arrow 3 */}
              <div className="hidden sm:flex items-center pt-7">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>

              {/* Step 4 */}
              <div className="text-center text-white min-w-0 flex-1 max-w-xs">
                <div className="w-14 h-14 mx-auto mb-3 border-2 border-white/50 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">Enjoy the Results</h3>
                <p className="text-white/80 text-xs sm:text-sm leading-tight italic">Come back to a fresh, spotless home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Before & After with Real Images */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Results
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              See the Difference
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Real results from our professional cleaning services
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
              <div className="grid md:grid-cols-2">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop&crop=center&auto=format&q=75"
                    alt="Dirty carpet before cleaning"
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-0 left-0">
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold shadow-md rounded-br-lg">
                      BEFORE
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop&crop=center&auto=format&q=75"
                    alt="Clean carpet after professional cleaning"
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-0 right-0">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold shadow-md rounded-bl-lg">
                      AFTER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials with Real Photos */}
      <section id="reviews" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Customer Reviews
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              What Our Customers Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Real feedback from satisfied customers across Toowoomba
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden" role="region" aria-label="Customer testimonials carousel" aria-live="polite">
              {/* Testimonials Container */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`
                }}
                role="group"
                aria-label="Customer testimonials"
              >
                {testimonials.map((testimonial, index) => (
                  <article
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                    role="group"
                    aria-labelledby={`testimonial-${index}-author`}
                  >
                    <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-red-100 h-80 flex flex-col justify-between">
                      <div className="flex justify-center mb-3" role="img" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-red-500 mx-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>

                      <blockquote className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed italic font-light flex-1 flex items-center px-4">
                        "{testimonial.text}"
                      </blockquote>

                      <footer className="flex items-center justify-center space-x-4 mt-4">
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.name}'s profile photo`}
                          className="w-12 h-12 rounded-full object-cover shadow-lg"
                          loading="lazy"
                        />
                        <div className="text-left">
                          <h4 id={`testimonial-${index}-author`} className="font-bold text-gray-800 text-sm sm:text-base">{testimonial.name}</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">{testimonial.location}</p>
                          <p className="text-red-600 font-medium text-xs">{testimonial.service}</p>
                        </div>
                      </footer>
                    </div>
                  </article>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-3 mt-12" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                      ? 'bg-red-500 w-8'
                      : 'bg-red-200 hover:bg-red-300'
                      }`}
                    role="tab"
                    aria-selected={index === currentTestimonial}
                    aria-label={`View testimonial ${index + 1} from ${testimonials[index].name}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA with Background Image */}
      <section id="contact" className="py-20 relative overflow-hidden" aria-labelledby="cta-title">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=600&fit=crop&crop=center&auto=format&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-red-500/90"></div>

        <div className="container mx-auto px-6 text-center relative">
          <h2 id="cta-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            Ready for a Spotless Home?
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the difference professional cleaning makes.
            <span className="font-semibold"> Get your free quote today.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center" role="group" aria-label="Contact options">
            <button
              onClick={openQuoteModal}
              className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-red-600 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-red-50 transform hover:scale-105 transition-all duration-300"
              aria-label="Get a free quote for cleaning services"
            >
              Get Free Quote Now
            </button>

            <a href="tel:0478711829" aria-label="Call Ilovah Cleaning Services at (04) 7871 1829">
              <button className="px-8 sm:px-12 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Call (04) 7871 1829
              </button>
            </a>

          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="py-12 md:py-16 bg-gray-900 text-white" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mb-8">
            {/* Left Column - Company Info */}
            <div>
              <div className="flex flex-col items-center sm:items-start space-y-4 mb-6">
                <img
                  src={logo}
                  alt="Ilovah Cleaning Logo"
                  className="w-16 h-16 object-contain rounded-lg"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold">Ilovah Cleaning</h3>
                  <p className="text-gray-400 text-sm md:text-base">Professional Cleaning Services</p>
                </div>
              </div>
              
              <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 text-center sm:text-left">
                Spotless Solutions, Lovingly Delivered. Professional cleaning services for homes and businesses across Toowoomba and surrounding areas.
              </p>
              
              {/* Social Media Links */}
              <div className="flex justify-center sm:justify-start space-x-4 mb-6">
                <a href="https://facebook.com/ilovahcleaning" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Facebook">
                  <svg className="w-7 h-7 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/ilovahcleaning" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Instagram">
                  <svg className="w-6 h-6 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@ilovahcleaning" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110" aria-label="Subscribe to our YouTube channel">
                  <svg className="w-6 h-6 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/ilovahcleaning" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-sky-500 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Twitter">
                  <svg className="w-6 h-6 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@ilovahcleaning" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on TikTok">
                  <svg className="w-6 h-6 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Services & Contact */}
            <div className="space-y-8">
              {/* Services Section */}
              <div className="text-center sm:text-left">
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-red-400">Our Services</h4>
                <ul className="grid grid-cols-2 gap-2 text-sm md:text-base text-gray-300" role="list">
                  <li className="hover:text-red-400 transition-colors duration-300 cursor-pointer">End of Lease Cleaning</li>
                  <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Pressure Washing</li>
                  <li className="hover:text-red-400 transition-colors duration-300 cursor-pointer">Pest Management</li>
                  <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Carpet Cleaning</li>
                  <li className="hover:text-red-400 transition-colors duration-300 cursor-pointer">Window Cleaning</li>
                  <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Gutter Cleaning</li>
                </ul>
              </div>

              {/* Contact Section */}
              <div className="text-center sm:text-left">
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-blue-400">Contact Info</h4>
                <address className="space-y-3 text-sm md:text-base text-gray-300 not-italic">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mx-auto sm:mx-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-center sm:text-left">4 Kelfield Street AL, NORTH TOOWOOMBA QLD 4350</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mx-auto sm:mx-0" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                    <a href="tel:0478711829" className="hover:text-red-400 transition-colors duration-300">(04) 7871 1829</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mx-auto sm:mx-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    <a href="mailto:ilovahcleaning@gmail.com" className="hover:text-blue-400 transition-colors duration-300 break-all">ilovahcleaning@gmail.com</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mx-auto sm:mx-0" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9.5 8a1 1 0 000 2h5a1 1 0 100-2h-5zm-3 4a1 1 0 011-1h9a1 1 0 110 2h-9a1 1 0 01-1-1zm1 3a1 1 0 100 2h7a1 1 0 100-2h-7z" clipRule="evenodd" />
                    </svg>
                    <a href="https://www.ilovah.com.au" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors duration-300">www.ilovah.com.au</a>
                  </div>
                </address>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">© 2024 Ilovah Cleaning Services. All rights reserved. | ABN: 12 345 678 901</p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                <a href="#" className="hover:text-red-400 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-red-400 transition-colors duration-300">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Background overlay with blur effect */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
            onClick={closeQuoteModal}
          ></div>

          {/* Modal container - centered and responsive */}
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
            {/* Modal panel - optimized height */}
            <div className="relative transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all w-full max-w-4xl max-h-[95vh] flex flex-col">
              {/* Modal Header - refined compact design */}
              <div className="relative bg-red-500 px-4 py-4 sm:px-6 flex-shrink-0">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)`
                  }}></div>
                </div>

                {/* Horizontal circle progress bar - mobile optimized */}
                <div className="relative">
                  <div className="flex items-center justify-center px-2 sm:px-8">
                    {[1, 2, 3, 4, 5].map((step, index) => (
                      <div key={step} className="flex items-center flex-1">
                        {/* Step circle and content */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep > step
                              ? 'bg-white text-red-600' // Completed - white with red text
                              : currentStep === step
                                ? 'bg-white text-red-600' // Current - white with red text
                                : 'bg-white/20 border-2 border-white/40 text-white/80' // Future - transparent with white text
                            }`}>
                            {currentStep > step ? (
                              <svg className="w-3 h-3 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className={`text-xs sm:text-sm font-bold ${currentStep >= step ? 'text-red-600' : 'text-white/80'
                                }`}>
                                {step < 10 ? `0${step}` : step}
                              </span>
                            )}
                          </div>

                          {/* Step labels */}
                          <div className="mt-2 sm:mt-3 text-center">
                            <div className={`text-xs sm:text-sm font-semibold ${currentStep >= step ? 'text-white' : 'text-white/70'
                              }`}>
                              {['Service', 'Contact', 'Property', 'Schedule', 'Review'][step - 1]}
                            </div>
                            <div className={`text-xs mt-1 hidden sm:block ${currentStep >= step ? 'text-white/90' : 'text-white/60'
                              }`}>
                              {[
                                'Select service',
                                'Your details',
                                'Property info',
                                'Schedule time',
                                'Review & submit'
                              ][step - 1]}
                            </div>
                          </div>
                        </div>

                        {/* Connecting line - horizontal only */}
                        {index < 4 && (
                          <div className="flex-1 h-0.5 mx-1 sm:mx-4 relative z-0" style={{ marginTop: '-30px' }}>
                            <div className={`h-full w-full transition-all duration-300 ${currentStep > step
                                ? 'bg-white'
                                : 'bg-white/20'
                              }`}></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Close button positioned at the end of progress bar */}
                  <button
                    onClick={closeQuoteModal}
                    className="absolute top-0 right-0 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group border border-white/30"
                  >
                    <svg className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content - scrollable with compact styling */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        What service do you need?
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Select the cleaning service that best fits your needs
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className={`group relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                            quoteFormData.service === service.title
                              ? 'border-red-500 bg-red-50 shadow-md scale-[1.01]'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                          onClick={() => updateRootFormData('service', service.title)}
                        >
                          {/* Selection indicator */}
                          <div className="absolute top-3 right-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                quoteFormData.service === service.title
                                  ? 'border-red-500 bg-red-500'
                                  : 'border-gray-300 group-hover:border-red-400'
                              }`}>
                              {quoteFormData.service === service.title && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>

                          <div className="pr-6">
                            <h5 className="font-bold text-gray-800 mb-2">{service.title}</h5>
                            
                            {/* Conditional content display */}
                            {!showDetails[index] ? (
                              /* Compact view - only View More button */
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleDetails(index)
                                }}
                                className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center transition-colors"
                              >
                                View More
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            ) : (
                              /* Expanded view - description and features */
                              <>
                                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{service.description}</p>
                                
                                {/* Features list - more compact */}
                                <div className="space-y-1 mb-3">
                                  {service.features.slice(0, 2).map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-xs text-gray-700">
                                      <div className="w-1 h-1 rounded-full bg-red-500 mr-2 flex-shrink-0"></div>
                                      <span>{feature}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleDetails(index)
                                  }}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center transition-colors"
                                >
                                  View Less
                                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        Your Contact Information
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        We'll use this information to send you a personalized quote
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-sm font-semibold text-gray-700">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={quoteFormData.contactInfo.firstName}
                            onChange={(e) => updateFormData('contactInfo', 'firstName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-semibold text-gray-700">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={quoteFormData.contactInfo.lastName}
                            onChange={(e) => updateFormData('contactInfo', 'lastName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-semibold text-gray-700">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={quoteFormData.contactInfo.email}
                            onChange={(e) => updateFormData('contactInfo', 'email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-semibold text-gray-700">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={quoteFormData.contactInfo.phone}
                            onChange={(e) => updateFormData('contactInfo', 'phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800"
                            placeholder="(04) 1234 5678"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          How would you prefer us to contact you?
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'phone', label: 'Phone', icon: '📞' },
                            { value: 'email', label: 'Email', icon: '✉️' },
                            { value: 'sms', label: 'SMS', icon: '💬' }
                          ].map((option) => (
                            <label key={option.value} className="relative">
                              <input
                                type="radio"
                                name="preferredContact"
                                value={option.value}
                                checked={quoteFormData.contactInfo.preferredContact === option.value}
                                onChange={(e) => updateFormData('contactInfo', 'preferredContact', e.target.value)}
                                className="sr-only"
                              />
                              <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center ${quoteFormData.contactInfo.preferredContact === option.value
                                  ? 'border-red-500 bg-red-50 shadow-md'
                                  : 'border-gray-300 hover:border-red-300'
                                }`}>
                                <div className="text-lg mb-1">{option.icon}</div>
                                <div className="text-sm font-medium text-gray-800">{option.label}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Property Details */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h4 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                        Property Details
                      </h4>
                      <p className="text-gray-600 text-base sm:text-lg">
                        Help us provide an accurate quote by telling us about your property
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-6">
                      {/* Property Type and Size */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Property Type *
                          </label>
                          <select
                            value={quoteFormData.propertyDetails.propertyType}
                            onChange={(e) => updateFormData('propertyDetails', 'propertyType', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800 bg-white"
                          >
                            <option value="">Select property type</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="office">Office</option>
                            <option value="commercial">Commercial</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Bedrooms
                          </label>
                          <select
                            value={quoteFormData.propertyDetails.bedrooms}
                            onChange={(e) => updateFormData('propertyDetails', 'bedrooms', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800 bg-white"
                          >
                            <option value="">Select bedrooms</option>
                            <option value="studio">Studio</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="3">3 Bedrooms</option>
                            <option value="4">4 Bedrooms</option>
                            <option value="5+">5+ Bedrooms</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Bathrooms
                          </label>
                          <select
                            value={quoteFormData.propertyDetails.bathrooms}
                            onChange={(e) => updateFormData('propertyDetails', 'bathrooms', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800 bg-white"
                          >
                            <option value="">Select bathrooms</option>
                            <option value="1">1 Bathroom</option>
                            <option value="2">2 Bathrooms</option>
                            <option value="3">3 Bathrooms</option>
                            <option value="4+">4+ Bathrooms</option>
                          </select>
                        </div>
                      </div>

                      {/* Address Information */}
                      <div className="space-y-6">
                        <div className="border-t border-gray-200 pt-6">
                          <h5 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h5>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Address Form Fields */}
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2 space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">
                                    Street Address
                                  </label>
                                  <input
                                    type="text"
                                    value={quoteFormData.propertyDetails.address}
                                    onChange={(e) => updateFormData('propertyDetails', 'address', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800"
                                    placeholder="123 Main Street"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">
                                    Suburb
                                  </label>
                                  <input
                                    type="text"
                                    value={quoteFormData.propertyDetails.suburb}
                                    onChange={(e) => updateFormData('propertyDetails', 'suburb', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800"
                                    placeholder="Toowoomba"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">
                                    Postcode *
                                  </label>
                                  <input
                                    type="text"
                                    value={quoteFormData.propertyDetails.postcode}
                                    onChange={(e) => updateFormData('propertyDetails', 'postcode', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800"
                                    placeholder="4350"
                                  />
                                </div>
                              </div>
                            </div>
                                                    
                            {/* Google Map */}
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Service Area Coverage Map
                              </label>
                              <div className="relative bg-gray-100 rounded-xl overflow-hidden border border-gray-300 h-64">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57337.99327706676!2d151.9269271!3d-27.5627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b96b2d55e8bf5c5%3A0x5017d681632ccc0!2sToowoomba%20QLD%2C%20Australia!5e0!3m2!1sen!2sau!4v1699000000000!5m2!1sen!2sau"
                                  width="100%"
                                  height="100%"
                                  style={{ border: 0 }}
                                  allowFullScreen=""
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  title="Service Area Map - Toowoomba"
                                  className="rounded-xl"
                                ></iframe>
                                                        
                                {/* Map Overlay Info */}
                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                                  <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-700">Service Area: Toowoomba & Surrounds</span>
                                  </div>
                                </div>
                              </div>
                                                      
                              <p className="text-xs text-gray-600 mt-2">
                                We service Toowoomba and surrounding areas. The map shows our primary coverage zone.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Special Requirements */}
                        <div className="border-t border-gray-200 pt-6">
                          <h5 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h5>
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Special Requirements or Access Instructions
                            </label>
                            <textarea
                              value={quoteFormData.propertyDetails.specialRequirements}
                              onChange={(e) => updateFormData('propertyDetails', 'specialRequirements', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800 resize-none"
                              rows="4"
                              placeholder="Please include any special requirements, access codes, parking instructions, pets, or areas that need extra attention..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Scheduling with Calendar */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        Schedule Your Service
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Select your preferred date and time slot from our availability calendar
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1, 1))}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        <h3 className="text-lg font-bold text-gray-800">
                          {currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>

                        <button
                          onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 1))}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="mb-6">
                        {/* Day headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar days */}
                        <div className="grid grid-cols-7 gap-1">
                          {/* Empty cells for days before month starts */}
                          {Array.from({ length: getFirstDayOfMonth(currentCalendarDate) }, (_, i) => (
                            <div key={`empty-${i}`} className="p-2"></div>
                          ))}

                          {/* Calendar days */}
                          {Array.from({ length: getDaysInMonth(currentCalendarDate) }, (_, i) => {
                            const day = i + 1
                            const date = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day)
                            const isPast = isDatePast(date)
                            const isSelected = isDateSelected(date)
                            const slots = generateTimeSlots(date)
                            const totalSlots = slots.morning.length + slots.afternoon.length

                            return (
                              <button
                                key={day}
                                onClick={() => {
                                  if (!isPast) {
                                    updateFormData('scheduling', 'selectedDate', formatDate(date))
                                    updateFormData('scheduling', 'selectedTimeSlot', '') // Reset time slot
                                  }
                                }}
                                disabled={isPast}
                                className={`p-2 rounded-lg text-sm transition-all duration-200 min-h-[60px] flex flex-col items-center justify-center ${isPast
                                    ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                                    : isSelected
                                      ? 'bg-red-500 text-white shadow-md'
                                      : 'text-gray-700 hover:bg-red-100 border border-gray-200'
                                  }`}
                              >
                                <span className="font-semibold">{day}</span>
                                {!isPast && (
                                  <div className="text-xs mt-1">
                                    {totalSlots > 0 ? (
                                      <span className={isSelected ? 'text-red-100' : 'text-red-600'}>
                                        {totalSlots} slots
                                      </span>
                                    ) : (
                                      <span className="text-red-500">Booked</span>
                                    )}
                                  </div>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Time Slot Selection */}
                      {quoteFormData.scheduling.selectedDate && (
                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Available Time Slots for {quoteFormData.scheduling.selectedDate ? new Date(quoteFormData.scheduling.selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            }) : 'Selected Date'}
                          </h4>

                          {(() => {
                            if (!quoteFormData.scheduling.selectedDate) {
                              return (
                                <div className="text-center py-8">
                                  <p className="text-gray-500">Please select a date first</p>
                                </div>
                              )
                            }
                            
                            const selectedDate = new Date(quoteFormData.scheduling.selectedDate + 'T00:00:00')
                            const slots = generateTimeSlots(selectedDate)

                            return (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Morning Slots */}
                                <div>
                                  <div className="flex items-center mb-3">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <h5 className="font-semibold text-gray-800">Morning Slots</h5>
                                  </div>
                                  <div className="space-y-2">
                                    {slots.morning.length > 0 ? (
                                      slots.morning.map((slot) => (
                                        <button
                                          key={slot}
                                          onClick={() => updateFormData('scheduling', 'selectedTimeSlot', slot)}
                                          className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${quoteFormData.scheduling.selectedTimeSlot === slot
                                              ? 'border-red-500 bg-red-50 text-red-700'
                                              : 'border-gray-300 hover:border-red-300 hover:bg-red-25'
                                            }`}
                                        >
                                          <div className="font-medium">{slot}</div>
                                          <div className="text-sm text-gray-600">Available</div>
                                        </button>
                                      ))
                                    ) : (
                                      <div className="p-3 text-center text-gray-500 bg-gray-100 rounded-lg">
                                        No morning slots available
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Afternoon Slots */}
                                <div>
                                  <div className="flex items-center mb-3">
                                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <h5 className="font-semibold text-gray-800">Afternoon Slots</h5>
                                  </div>
                                  <div className="space-y-2">
                                    {slots.afternoon.length > 0 ? (
                                      slots.afternoon.map((slot) => (
                                        <button
                                          key={slot}
                                          onClick={() => updateFormData('scheduling', 'selectedTimeSlot', slot)}
                                          className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${quoteFormData.scheduling.selectedTimeSlot === slot
                                              ? 'border-red-500 bg-red-50 text-red-700'
                                              : 'border-gray-300 hover:border-red-300 hover:bg-red-25'
                                            }`}
                                        >
                                          <div className="font-medium">{slot}</div>
                                          <div className="text-sm text-gray-600">Available</div>
                                        </button>
                                      ))
                                    ) : (
                                      <div className="p-3 text-center text-gray-500 bg-gray-100 rounded-lg">
                                        No afternoon slots available
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })()
                          }
                        </div>
                      )}

                      {/* Urgency Selection */}
                      <div className="border-t border-gray-200 pt-6 mt-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          How urgent is this service?
                        </label>
                        <select
                          value={quoteFormData.scheduling.urgency}
                          onChange={(e) => updateFormData('scheduling', 'urgency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800 bg-white"
                        >
                          <option value="flexible">Flexible (Within 2 weeks)</option>
                          <option value="soon">Soon (Within 1 week)</option>
                          <option value="urgent">Urgent (Within 3 days)</option>
                          <option value="asap">ASAP (Next day)</option>
                        </select>
                      </div>

                      {/* Information Note */}
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200 mt-6">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-semibold text-red-800 mb-1">Booking Information</h5>
                            <p className="text-sm text-red-700 leading-relaxed">
                              Select your preferred date and time slot. We'll confirm availability and provide an exact arrival window. All bookings include a 30-minute call-ahead notice.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Preview and Submit */}
                {currentStep === 5 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h4 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                        Review Your Quote Request
                      </h4>
                      <p className="text-gray-600 text-base sm:text-lg">
                        Please review your information before submitting
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Service Summary */}
                      <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <h5 className="text-lg font-bold text-gray-800">Service Selected</h5>
                        </div>
                        <p className="text-gray-700 font-medium text-lg">{quoteFormData.service}</p>
                      </div>

                      {/* Contact Info Summary */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <h5 className="text-lg font-bold text-gray-800">Contact Information</h5>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Name:</span>
                            <span>{quoteFormData.contactInfo.firstName} {quoteFormData.contactInfo.lastName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Email:</span>
                            <span className="break-all">{quoteFormData.contactInfo.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Phone:</span>
                            <span>{quoteFormData.contactInfo.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Contact via:</span>
                            <span className="capitalize">{quoteFormData.contactInfo.preferredContact}</span>
                          </div>
                        </div>
                      </div>

                      {/* Property Details Summary */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <h5 className="text-lg font-bold text-gray-800">Property Details</h5>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Type:</span>
                            <span className="capitalize">{quoteFormData.propertyDetails.propertyType}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Bedrooms:</span>
                            <span>{quoteFormData.propertyDetails.bedrooms}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Bathrooms:</span>
                            <span>{quoteFormData.propertyDetails.bathrooms}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Postcode:</span>
                            <span>{quoteFormData.propertyDetails.postcode}</span>
                          </div>
                          {quoteFormData.propertyDetails.address && (
                            <div className="flex items-center space-x-2 sm:col-span-2">
                              <span className="font-medium text-gray-800">Address:</span>
                              <span>{quoteFormData.propertyDetails.address}</span>
                            </div>
                          )}
                          {quoteFormData.propertyDetails.suburb && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-800">Suburb:</span>
                              <span>{quoteFormData.propertyDetails.suburb}</span>
                            </div>
                          )}
                          {quoteFormData.propertyDetails.specialRequirements && (
                            <div className="sm:col-span-2">
                              <div className="font-medium text-gray-800 mb-1">Special Requirements:</div>
                              <div className="text-gray-700 bg-white rounded-lg p-3 border">
                                {quoteFormData.propertyDetails.specialRequirements}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Scheduling Summary */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h5 className="text-lg font-bold text-gray-800">Scheduling Preferences</h5>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Selected Date:</span>
                            <span>
                              {quoteFormData.scheduling.selectedDate
                                ? new Date(quoteFormData.scheduling.selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })
                                : 'Not selected'
                              }
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Time Slot:</span>
                            <span>{quoteFormData.scheduling.selectedTimeSlot || 'Not selected'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">Urgency:</span>
                            <span className="capitalize">{quoteFormData.scheduling.urgency.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Next Steps Information */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-bold text-green-800 mb-2">What happens next?</h5>
                            <div className="space-y-2 text-sm text-green-700">
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span>We'll contact you within 2 hours with your personalized quote</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span>We'll confirm your preferred date and time</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span>We'll call 30 minutes before arrival on service day</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Compact Modal Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-4 sm:px-6 border-t border-gray-200 flex-shrink-0">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                  {/* Previous Button */}
                  <div className="flex items-center">
                    {currentStep > 1 && (
                      <button
                        onClick={prevStep}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-all duration-200 group"
                      >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Previous</span>
                      </button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={closeQuoteModal}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>

                    {currentStep < 5 ? (
                      <button
                        onClick={nextStep}
                        className="flex items-center space-x-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold group"
                      >
                        <span>Continue</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Handle form submission here
                          alert('Quote request submitted successfully! \n\nOur team will contact you within 2 hours with your personalized quote.\n\nThank you for choosing Ilovah Cleaning Services!')
                          actuallyCloseModal()
                        }}
                        className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold group"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Submit Request</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Exit Modal */}
      {showConfirmExit && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="confirm-exit-title" role="dialog" aria-modal="true">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          ></div>

          {/* Confirmation modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-md">
              {/* Header */}
              <div className="bg-red-500 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 id="confirm-exit-title" className="text-lg font-semibold text-white">
                      You're Almost Done!
                    </h3>
                    <p className="text-red-100 text-sm mt-1">
                      Don't lose your progress
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div>
                    <p className="text-gray-800 font-medium text-lg mb-2">
                      Are you sure you want to leave?
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      You've made progress on your quote request. If you leave now, you'll lose all the information you've entered and will need to start over.
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center justify-center space-x-2 text-red-700">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">
                        Step {currentStep} of 5 completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:gap-3 sm:justify-end">
                <button
                  onClick={actuallyCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium order-2 sm:order-1"
                >
                  Yes, Leave
                </button>
                <button
                  onClick={cancelExit}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold order-1 sm:order-2"
                >
                  Stay & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-4 right-4 z-50 p-2 bg-red-50 text-red-600 border border-red-200 rounded-full shadow-lg hover:shadow-xl hover:bg-red-100 transition-all duration-300 hover:scale-125`}
          style={{
            animation: isScrolling ? 'bounce 0.6s ease-out 3' : 'gentleBounce 2.5s ease-in-out infinite'
          }}
          aria-label="Scroll to top"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Custom bounce keyframes */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -15px, 0);
          }
          70% {
            transform: translate3d(0, -7px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        @keyframes gentleBounce {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -8px, 0);
          }
        }
      `}</style>
    </main>
  )
}

export default App