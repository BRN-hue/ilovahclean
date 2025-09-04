import React, { useState, useEffect } from 'react'
import logo from './assets/logo.png'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const services = [
    {
      title: "End of Lease Cleaning",
      description: "Complete bond cleaning to ensure your deposit return",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-amber-400 to-orange-500",
      features: ["Full property cleaning", "Bond guarantee", "Professional equipment"]
    },
    {
      title: "Regular House Cleaning",
      description: "Weekly, fortnightly, or monthly home maintenance",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-yellow-400 to-amber-500",
      features: ["Flexible scheduling", "Consistent quality", "Eco-friendly products"]
    },
    {
      title: "Carpet Cleaning",
      description: "Deep steam cleaning for fresh, spotless carpets",
      image: "https://source.unsplash.com/400x250/?carpet-cleaning",
      gradient: "from-amber-500 to-yellow-600",
      features: ["Steam cleaning", "Stain removal", "Fast drying"]
    },
    {
      title: "Window Cleaning",
      description: "Crystal clear windows inside and out",
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-orange-400 to-amber-500",
      features: ["Interior & exterior", "Streak-free finish", "Screen cleaning"]
    },
    {
      title: "Office Cleaning",
      description: "Professional commercial cleaning services",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-amber-600 to-orange-600",
      features: ["After hours service", "Sanitization", "Waste management"]
    },
    {
      title: "Pest Control",
      description: "Safe and effective pest management solutions",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=250&fit=crop&crop=center&auto=format&q=75",
      gradient: "from-yellow-500 to-amber-600",
      features: ["Eco-friendly methods", "Follow-up service", "Prevention advice"]
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-800 overflow-x-hidden">
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
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(245,158,11,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(249,115,22,0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Professional Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-amber-200/50' : 'bg-white/80 backdrop-blur-md'
        }`}>
        <div className="container mx-auto px-6">
          {/* Top bar with contact info */}
          <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-amber-100">
            <div className="flex items-center space-x-6">
              <span className="flex items-center"><span className="mr-2">📍</span>Serving Toowoomba & Surrounds</span>
              <span className="flex items-center"><span className="mr-2">⏰</span>Mon-Sun: 7AM-7PM</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="flex items-center"><span className="mr-2">📞</span>1300 ILOVAH</span>
              <span className="flex items-center"><span className="mr-2">✉️</span>info@ilovah.com.au</span>
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
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
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
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium relative group py-2"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-amber-600 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-amber-100">
              <div className="flex flex-col space-y-4 pt-4">
                {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-amber-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold w-fit">
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section with Background Image */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/50"></div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            {/* Professional Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-amber-200 rounded-full px-6 py-2 mb-8 shadow-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Professional • Reliable • Trusted Since 2020</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="text-gray-800">Spotless Solutions,</span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                Lovingly Delivered
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
              Delivering comprehensive home cleaning services tailored for you and your family—
              <span className="text-amber-700 font-semibold"> always reliable, always smiling.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="group px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Free Quote Today
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>

              <button className="px-10 py-4 bg-white border-2 border-amber-300 text-amber-700 rounded-xl font-semibold text-lg hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-lg">
                Call (04) 7871 1829
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Satisfied Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-1">99.9%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-1">5⭐</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section with Real Images */}
      <section id="services" className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Services
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Comprehensive Cleaning Solutions
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From regular maintenance to specialized deep cleans, we offer professional services to keep your space pristine
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative h-[600px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-amber-100 hover:border-amber-200 transition-all duration-500 hover:transform hover:-translate-y-2"
              >
                {/* Full Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>

                {/* Content overlay */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Top badge */}
                  <div className="flex justify-end">
                    <div className={`inline-f lex items-center px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white text-xs font-semibold shadow-lg`}>
                      Professional Service
                    </div>
                  </div>

                  {/* Main content - bottom positioned */}
                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">
                      {service.title}
                    </h3>

                    <p className="text-white/90 mb-6 leading-relaxed drop-shadow-md">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-white/95">
                          <div className="w-2 h-2 rounded-full bg-white mr-3 flex-shrink-0 shadow-sm"></div>
                          <span className="text-sm drop-shadow-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="w-full py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
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
      <section className="py-20 relative overflow-hidden">
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

        <div className="container mx-auto px-6 relative">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              How It Works
            </h2>
          </div>

          {/* Steps Flow */}
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="text-center text-white min-w-0 flex-1 max-w-xs">
                <div className="w-14 h-14 mx-auto mb-3 border-2 border-white/50 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold">Select the service</h3>
                <p className="text-white/80 text-xs md:text-sm">that fits your needs.</p>
              </div>

              {/* Arrow 1 */}
              <div className="hidden sm:flex">
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
                <h3 className="text-base md:text-lg font-semibold">Get an Instant Quote</h3>
                <p className="text-white/80 text-xs md:text-sm">or Book Online</p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden sm:flex">
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
                <h3 className="text-base md:text-lg font-semibold">We do the work</h3>
                <p className="text-white/80 text-xs md:text-sm italic">Our friendly team gets the job done right.</p>
              </div>

              {/* Arrow 3 */}
              <div className="hidden sm:flex">
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
                <h3 className="text-base md:text-lg font-semibold">Enjoy the Results</h3>
                <p className="text-white/80 text-xs md:text-sm italic">Come back to a fresh, spotless home.</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              See the Difference
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our professional cleaning services
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
              <div className="grid md:grid-cols-2">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop&crop=center&auto=format&q=75"
                    alt="Dirty carpet before cleaning"
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-red-500/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <h3 className="text-3xl font-bold text-red-700 mb-2">BEFORE</h3>
                      <p className="text-red-600">Stained & Dirty</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop&crop=center&auto=format&q=75"
                    alt="Clean carpet after professional cleaning"
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-green-500/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <h3 className="text-3xl font-bold text-green-700 mb-2">AFTER</h3>
                      <p className="text-green-600">Fresh & Spotless</p>
                    </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from satisfied customers across Toowoomba
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              {/* Testimonials Container */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-amber-100 h-80 flex flex-col justify-between">
                      <div className="flex justify-center mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-amber-500 text-xl mx-1">⭐</span>
                        ))}
                      </div>

                      <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed italic font-light flex-1 flex items-center px-4">
                        "{testimonial.text}"
                      </blockquote>

                      <div className="flex items-center justify-center space-x-4 mt-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover shadow-lg"
                          loading="lazy"
                        />
                        <div className="text-left">
                          <h4 className="font-bold text-gray-800 text-base">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.location}</p>
                          <p className="text-amber-600 font-medium text-xs">{testimonial.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-3 mt-12">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                      ? 'bg-amber-500 w-8'
                      : 'bg-amber-200 hover:bg-amber-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA with Background Image */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=600&fit=crop&crop=center&auto=format&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/90 to-orange-500/90"></div>

        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready for a Spotless Home?
          </h2>

          <p className="text-xl md:text-2xl text-amber-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the difference professional cleaning makes.
            <span className="font-semibold"> Get your free quote today.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-12 py-4 bg-white text-amber-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get Free Quote Now
            </button>

            <button className="px-12 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Call (04) 7871 1829
            </button>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img
  src={logo}
  alt="Ilovah Cleaning Logo"
  className="w-12 h-12 object-contain rounded-lg"
/>

                <div>
                  <h3 className="text-2xl font-bold">Ilovah Cleaning</h3>
                  <p className="text-gray-400 text-sm">Professional Cleaning Services</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Spotless Solutions, Lovingly Delivered. Professional cleaning services for homes and businesses across Toowoomba and surrounding areas.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-400">Our Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>End of Lease Cleaning</li>
                <li>Regular House Cleaning</li>
                <li>Carpet Cleaning</li>
                <li>Window Cleaning</li>
                <li>Office Cleaning</li>
                <li>Pest Control</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-400">Contact Info</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="mr-2">📍</span>Australia</li>
                <li className="flex items-center"><span className="mr-2">📞</span>1300 ILOVAH</li>
                <li className="flex items-center"><span className="mr-2">✉️</span>info@ilovah.com.au</li>
                <li className="flex items-center"><span className="mr-2">🌐</span>www.ilovah.com.au</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2024 Ilovah Cleaning Services. All rights reserved. | ABN: 12 345 678 901</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App