import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'

const Careers = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [employmentFilter, setEmploymentFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [employmentDropdownOpen, setEmploymentDropdownOpen] = useState(false)
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false)
  const [employmentSearch, setEmploymentSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleNavigation = (section) => {
    navigate('/', { replace: true })
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const element = document.getElementById(section.toLowerCase())
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const employmentRef = useRef(null)
  const locationRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (employmentRef.current && !employmentRef.current.contains(event.target)) {
        setEmploymentDropdownOpen(false)
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationDropdownOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsApplicationModalOpen(false)
        setEmploymentDropdownOpen(false)
        setLocationDropdownOpen(false)
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleApplyClick = (jobTitle) => {
    setSelectedPosition(jobTitle)
    setFormData(prev => ({ ...prev, position: jobTitle.toLowerCase().replace(/\s+/g, '') }))
    setIsApplicationModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your application! We will get back to you soon.')
    setIsApplicationModalOpen(false)
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      message: ''
    })
  }

  const employmentOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' }
  ]

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'toowoomba', label: 'Toowoomba, QLD' }
  ]

  const filteredEmploymentOptions = employmentOptions.filter(option =>
    option.label.toLowerCase().includes(employmentSearch.toLowerCase())
  )

  const filteredLocationOptions = locationOptions.filter(option =>
    option.label.toLowerCase().includes(locationSearch.toLowerCase())
  )

  const getDisplayValue = (value, options) => {
    const option = options.find(opt => opt.value === value)
    return option ? option.label : 'Select...'
  }

  const jobOpenings = [
    {
      title: "Residential Cleaning Specialist",
      type: "Full-time / Part-time",
      location: "Toowoomba, QLD",
      description: "Join our team as a residential cleaning specialist. Perfect for detail-oriented individuals who take pride in creating spotless homes."
    },
    {
      title: "End of Lease Cleaning Technician", 
      type: "Full-time",
      location: "Toowoomba, QLD",
      description: "Specialized role focusing on bond cleaning services. Help tenants get their bonds back with thorough, professional cleaning."
    },
    {
      title: "Commercial Cleaning Supervisor",
      type: "Full-time", 
      location: "Toowoomba, QLD",
      description: "Lead our commercial cleaning division, managing teams and ensuring high-quality service delivery to business clients."
    }
  ]

  // Filter jobs based on search term, employment type, and location
  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesEmployment = employmentFilter === 'all' ||
                             job.type.toLowerCase().includes(employmentFilter.toLowerCase())
    
    const matchesLocation = locationFilter === 'all' ||
                           job.location.toLowerCase().includes(locationFilter.toLowerCase())
    
    return matchesSearch && matchesEmployment && matchesLocation
  })

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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-red-200/50' : 'bg-white/80 backdrop-blur-md'
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
                0478 711 829
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
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain rounded-lg transition-shadow duration-300"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-2xl font-bold text-gray-800">
                  <span className="text-red-600">
                    iLovah Cleaning Services
                  </span>
                </h1>
              </div>
            </div>

            {/* Clean Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Team', 'Reviews', 'FAQ', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigation(item)}
                  className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium relative group py-2"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
              <Link
                to="/careers"
                className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium relative group py-2"
              >
                Careers
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <button
                onClick={() => handleNavigation('Contact')}
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
                {['Services', 'Team', 'Reviews', 'FAQ', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      handleNavigation(item)
                      setIsMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-red-600 transition-colors py-2 text-left w-full"
                  >
                    {item}
                  </button>
                ))}
                <Link
                  to="/careers"
                  className="text-gray-700 hover:text-red-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Careers
                </Link>
                <button
                  onClick={() => {
                    handleNavigation('Contact')
                    setIsMenuOpen(false)
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 w-fit"
                >
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content with proper spacing */}
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-white/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Find your next role
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Join us in building something great with Ilovah Cleaning. We're transforming how cleaning services work in Toowoomba, creating fresh opportunities for growth, learning and career development.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Competitive hourly rates
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Flexible schedule
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Full training provided
              </div>
            </div>
          </div>
        </section>



        {/* Current Openings */}
        <section className="py-16 bg-white/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Current openings
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Explore our available positions and find your perfect fit
              </p>
            </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Search Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-sm sm:text-base"
                />
              </div>
              
              {/* Employment Type Filter */}
              <div className="relative" ref={employmentRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                <div className="relative">
                  <div
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white cursor-pointer flex items-center justify-between text-sm sm:text-base"
                    onClick={() => setEmploymentDropdownOpen(!employmentDropdownOpen)}
                  >
                    <span className={employmentFilter === 'all' ? 'text-gray-400' : 'text-gray-900'}>
                      {getDisplayValue(employmentFilter, employmentOptions)}
                    </span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${employmentDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {employmentDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search employment types..."
                          value={employmentSearch}
                          onChange={(e) => setEmploymentSearch(e.target.value)}
                          className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredEmploymentOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                              employmentFilter === option.value ? 'bg-red-50 text-red-600' : 'text-gray-900'
                            }`}
                            onClick={() => {
                              setEmploymentFilter(option.value)
                              setEmploymentDropdownOpen(false)
                              setEmploymentSearch('')
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                        {filteredEmploymentOptions.length === 0 && (
                          <div className="px-4 py-2 text-gray-500">No options found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Location Filter */}
              <div className="relative" ref={locationRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <div
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white cursor-pointer flex items-center justify-between text-sm sm:text-base"
                    onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  >
                    <span className={locationFilter === 'all' ? 'text-gray-400' : 'text-gray-900'}>
                      {getDisplayValue(locationFilter, locationOptions)}
                    </span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {locationDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search locations..."
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredLocationOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                              locationFilter === option.value ? 'bg-red-50 text-red-600' : 'text-gray-900'
                            }`}
                            onClick={() => {
                              setLocationFilter(option.value)
                              setLocationDropdownOpen(false)
                              setLocationSearch('')
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                        {filteredLocationOptions.length === 0 && (
                          <div className="px-4 py-2 text-gray-500">No options found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Results Counter */}
            <div className="text-base sm:text-lg font-semibold text-red-600">
              {filteredJobs.length} jobs
            </div>
          </div>

          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 text-xs sm:text-sm text-gray-600">
                      <span>{job.type}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleApplyClick(job.title)}
                    className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-sm sm:text-base text-gray-600">{job.description}</p>
              </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-base sm:text-lg">No positions found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setEmploymentFilter('all')
                    setLocationFilter('all')
                    setEmploymentDropdownOpen(false)
                    setLocationDropdownOpen(false)
                    setEmploymentSearch('')
                    setLocationSearch('')
                  }}
                  className="mt-4 text-red-600 hover:text-red-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          </div>
        </section>
      </div>

      {/* Application Modal */}
      {isApplicationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Apply for {selectedPosition}
                </h2>
                <button
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={selectedPosition}
                    disabled
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded bg-gray-100 text-gray-600 text-sm sm:text-base"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about yourself
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about your experience and why you'd like to join our team..."
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-red-600 text-white py-3 px-8 rounded font-medium hover:bg-red-700 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
      )}

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="Ilovah Cleaning" className="w-8 h-8" />
                <span className="text-lg font-semibold">Ilovah Cleaning</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional cleaning services for homes and businesses across Toowoomba.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><a href="/#services" className="hover:text-white">Services</a></li>
                <li><a href="/#contact" className="hover:text-white">Contact</a></li>
                <li><span className="text-white">Careers</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>4 Kelfield Street, North Toowoomba QLD</p>
                <p>0478 711 829</p>
                <p>ilovahcleaning@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 Ilovah Cleaning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Careers