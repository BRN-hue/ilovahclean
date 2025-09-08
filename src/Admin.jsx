import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'

const Admin = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [draggedOverIndex, setDraggedOverIndex] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [services, setServices] = useState([
    { 
      id: 1,
      name: "End of Lease Cleaning", 
      price: "$250-400", 
      duration: "4-6 hours", 
      bookings: 45, 
      status: "active",
      image: "/api/placeholder/300/200",
      description: "Comprehensive cleaning service for rental properties"
    },
    { 
      id: 2,
      name: "Carpet Cleaning", 
      price: "$120-200", 
      duration: "2-3 hours", 
      bookings: 32, 
      status: "active",
      image: "/api/placeholder/300/200",
      description: "Professional steam cleaning for all carpet types"
    },
    { 
      id: 3,
      name: "Window Cleaning", 
      price: "$80-150", 
      duration: "1-2 hours", 
      bookings: 28, 
      status: "active",
      image: "/api/placeholder/300/200",
      description: "Crystal clear windows inside and out"
    },
    { 
      id: 4,
      name: "Pressure Washing", 
      price: "$150-300", 
      duration: "2-4 hours", 
      bookings: 15, 
      status: "active",
      image: "/api/placeholder/300/200",
      description: "High-pressure cleaning for driveways and exteriors"
    },
    { 
      id: 5,
      name: "Gutter Cleaning", 
      price: "$100-180", 
      duration: "1-3 hours", 
      bookings: 12, 
      status: "active",
      image: "/api/placeholder/300/200",
      description: "Safe and thorough gutter maintenance"
    },
    { 
      id: 6,
      name: "Pest Management", 
      price: "$200-350", 
      duration: "1-2 hours", 
      bookings: 0, 
      status: "coming_soon",
      image: "/api/placeholder/300/200",
      description: "Eco-friendly pest control solutions"
    }
  ])

  const handleLogout = () => {
    // TODO: Clear authentication tokens/session here
    navigate('/admin')
  }

  // Image management functions
  const handleImageUpload = (serviceId, file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setServices(prevServices => 
        prevServices.map(service => 
          service.id === serviceId 
            ? { ...service, image: e.target.result }
            : service
        )
      )
    }
    reader.readAsDataURL(file)
  }

  const handleImageDelete = (serviceId) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? { ...service, image: "/api/placeholder/300/200" }
          : service
      )
    )
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    setDraggedOverIndex(index)
  }

  const handleDragLeave = () => {
    setDraggedOverIndex(null)
  }

  const handleDrop = (e, serviceId) => {
    e.preventDefault()
    setDraggedOverIndex(null)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleImageUpload(serviceId, imageFile)
    }
  }

  // Service management functions
  const handleEditService = (service) => {
    setEditingService({ ...service })
  }

  const handleSaveService = () => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === editingService.id ? editingService : service
      )
    )
    setEditingService(null)
  }

  const handleDeleteService = (serviceId) => {
    setServices(prevServices => 
      prevServices.filter(service => service.id !== serviceId)
    )
    setShowDeleteConfirm(null)
  }

  const handleCancelEdit = () => {
    setEditingService(null)
  }

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-2 2V5H5v14h14v-1.586l2-2V19a1 1 0 01-1 1H4a1 1 0 01-1-1V4z' },
    { id: 'bookings', name: 'Bookings', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'customers', name: 'Customers', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'services', name: 'Services', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { id: 'applicants', name: 'Applicants', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'reports', name: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'settings', name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ]

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 md:w-5 md:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-2 md:ml-4 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Today's Bookings</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-2 md:ml-4 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Revenue (Month)</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">$8,420</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-2 md:ml-4 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Active Customers</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">156</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 md:w-5 md:h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-2 md:ml-4 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Avg Rating</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">4.9</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                  <h3 className="text-base md:text-lg font-medium text-gray-900">Recent Bookings</h3>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-3">
                    {[
                      { name: "Sarah Johnson", service: "End of Lease Cleaning", time: "2:00 PM", status: "confirmed" },
                      { name: "Michael Lee", service: "Carpet Cleaning", time: "10:00 AM", status: "pending" },
                      { name: "Emily White", service: "Window Cleaning", time: "3:00 PM", status: "completed" }
                    ].map((booking, index) => (
                      <div key={index} className="flex items-start justify-between py-2 space-x-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm md:text-base font-medium text-gray-900 truncate">{booking.name}</p>
                          <p className="text-xs md:text-sm text-gray-600 truncate">{booking.service}</p>
                          <p className="text-xs text-gray-500">{booking.time}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                  <h3 className="text-base md:text-lg font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {[
                      { name: "New Booking", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6", color: "red" },
                      { name: "View Schedule", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "blue" },
                      { name: "Customer List", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "green" },
                      { name: "Reports", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "purple" }
                    ].map((action, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSection(action.name.toLowerCase().replace(' ', ''))}
                        className={`p-3 md:p-4 text-left border border-gray-200 rounded-lg hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-all duration-200 group`}
                      >
                        <div className={`w-6 h-6 md:w-8 md:h-8 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-${action.color}-200`}>
                          <svg className={`w-3 h-3 md:w-4 md:h-4 text-${action.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
                          </svg>
                        </div>
                        <p className="text-sm md:text-base font-medium text-gray-900">{action.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'bookings':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
                <p className="text-gray-600">Manage all customer bookings and appointments</p>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                New Booking
              </button>
            </div>
            
            {/* Booking Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Today</h3>
                <p className="text-lg md:text-2xl font-bold text-blue-600">8</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">This Week</h3>
                <p className="text-lg md:text-2xl font-bold text-green-600">24</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Pending</h3>
                <p className="text-lg md:text-2xl font-bold text-yellow-600">5</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Completed</h3>
                <p className="text-lg md:text-2xl font-bold text-purple-600">19</p>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 1, customer: "Sarah Johnson", service: "End of Lease Cleaning", date: "Dec 8, 2024 2:00 PM", status: "confirmed", phone: "0412 345 678" },
                      { id: 2, customer: "Michael Lee", service: "Carpet Cleaning", date: "Dec 9, 2024 10:00 AM", status: "pending", phone: "0423 456 789" },
                      { id: 3, customer: "Emily White", service: "Window Cleaning", date: "Dec 10, 2024 3:00 PM", status: "completed", phone: "0434 567 890" }
                    ].map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                            <div className="text-sm text-gray-500">{booking.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-red-600 hover:text-red-900 mr-3">Edit</button>
                          <button className="text-gray-600 hover:text-gray-900">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'customers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                <p className="text-gray-600">View and manage your customer database</p>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Add Customer
              </button>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Total Customers</h3>
                <p className="text-lg md:text-2xl font-bold text-blue-600">156</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">New This Month</h3>
                <p className="text-lg md:text-2xl font-bold text-green-600">12</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Repeat Customers</h3>
                <p className="text-lg md:text-2xl font-bold text-purple-600">89</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-medium text-gray-900">Customer Directory</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { name: "Sarah Johnson", email: "sarah.j@email.com", phone: "0412 345 678", address: "123 Main St, Toowoomba", bookings: 5, lastService: "Nov 15, 2024" },
                  { name: "Michael Lee", email: "m.lee@email.com", phone: "0423 456 789", address: "456 Oak Ave, Middle Ridge", bookings: 3, lastService: "Dec 1, 2024" },
                  { name: "Emily White", email: "emily.white@email.com", phone: "0434 567 890", address: "789 Pine Rd, North Toowoomba", bookings: 8, lastService: "Dec 5, 2024" },
                  { name: "David Chen", email: "d.chen@email.com", phone: "0445 678 901", address: "321 Elm St, Hodgson Vale", bookings: 2, lastService: "Oct 20, 2024" }
                ].map((customer, index) => (
                  <div key={index} className="p-4 md:p-6 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 font-medium text-sm md:text-base">{customer.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base md:text-lg font-medium text-gray-900 truncate">{customer.name}</h4>
                            <div className="text-xs md:text-sm text-gray-600 space-y-1">
                              <p className="truncate">{customer.email} • {customer.phone}</p>
                              <p className="truncate">{customer.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end space-y-2">
                        <div className="text-xs md:text-sm text-gray-600">
                          <p><span className="font-medium">{customer.bookings}</span> bookings</p>
                          <p>Last: {customer.lastService}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-red-600 hover:text-red-900 text-xs md:text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors">View</button>
                          <button className="text-gray-600 hover:text-gray-900 text-xs md:text-sm px-2 py-1 rounded hover:bg-gray-50 transition-colors">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
                <p className="text-gray-600">Manage your cleaning services and pricing</p>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Add Service
              </button>
            </div>

            {/* Service Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Active Services</h3>
                <p className="text-lg md:text-2xl font-bold text-blue-600">6</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Most Popular</h3>
                <p className="text-sm md:text-base font-bold text-green-600">End of Lease</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Avg. Price</h3>
                <p className="text-lg md:text-2xl font-bold text-purple-600">$180</p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, index) => (
                <div key={service.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {/* Image Section with Drag & Drop */}
                  <div 
                    className={`relative h-48 bg-gray-100 border-2 border-dashed transition-all duration-200 ${
                      draggedOverIndex === index 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, service.id)}
                  >
                    {service.image && service.image !== "/api/placeholder/300/200" ? (
                      <>
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Image Controls Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="flex space-x-2">
                            <label className="bg-white text-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files[0]) {
                                    handleImageUpload(service.id, e.target.files[0])
                                  }
                                }}
                              />
                            </label>
                            <button 
                              onClick={() => handleImageDelete(service.id)}
                              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Upload Placeholder */
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-center px-4">
                          {draggedOverIndex === index ? 'Drop image here' : 'Drag & drop image or click to upload'}
                        </p>
                        <label className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition-colors text-sm">
                          Choose Image
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                handleImageUpload(service.id, e.target.files[0])
                              }
                            }}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {/* Service Details */}
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      <h3 className="text-base md:text-lg font-medium text-gray-900 truncate pr-2">{service.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                        service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {service.status === 'active' ? 'Active' : 'Coming Soon'}
                      </span>
                    </div>
                    
                    <p className="text-xs md:text-sm text-gray-600 mb-3">{service.description}</p>
                    
                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600 mb-4">
                      <p><span className="font-medium">Price Range:</span> {service.price}</p>
                      <p><span className="font-medium">Duration:</span> {service.duration}</p>
                      <p><span className="font-medium">Total Bookings:</span> {service.bookings}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditService(service)}
                        className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded text-xs md:text-sm hover:bg-red-100 transition-colors"
                      >
                        Edit Service
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(service.id)}
                        className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded text-xs md:text-sm hover:bg-gray-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Service Modal */}
            {editingService && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Service</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                      <input
                        type="text"
                        value={editingService.name}
                        onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        rows="3"
                        value={editingService.description}
                        onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                        <input
                          type="text"
                          value={editingService.price}
                          onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={editingService.duration}
                          onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={editingService.status}
                        onChange={(e) => setEditingService({...editingService, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="coming_soon">Coming Soon</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveService}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Service</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete this service? This action cannot be undone.
                  </p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteService(showDeleteConfirm)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      case 'applicants':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Job Applicants</h1>
              <p className="text-gray-600">Review and manage job applicants for your team</p>
            </div>

            {/* Applicant Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">New Applicants</h3>
                <p className="text-lg md:text-2xl font-bold text-blue-600">8</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Under Review</h3>
                <p className="text-lg md:text-2xl font-bold text-yellow-600">5</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Interviews</h3>
                <p className="text-lg md:text-2xl font-bold text-green-600">3</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs md:text-sm font-medium text-gray-600">Hired</h3>
                <p className="text-lg md:text-2xl font-bold text-purple-600">2</p>
              </div>
            </div>

            {/* Applicants List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-medium text-gray-900">Recent Applicants</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { name: "Jessica Chen", position: "Cleaning Specialist", experience: "3 years", applied: "Dec 5, 2024", status: "new", email: "jessica.chen@email.com", phone: "0412 123 456" },
                  { name: "Mark Thompson", position: "Carpet Cleaning Technician", experience: "5 years", applied: "Dec 3, 2024", status: "review", email: "mark.t@email.com", phone: "0423 234 567" },
                  { name: "Lisa Rodriguez", position: "Team Leader", experience: "7 years", applied: "Dec 1, 2024", status: "interview", email: "lisa.r@email.com", phone: "0434 345 678" },
                  { name: "James Wilson", position: "Cleaning Specialist", experience: "2 years", applied: "Nov 28, 2024", status: "hired", email: "james.w@email.com", phone: "0445 456 789" }
                ].map((applicant, index) => (
                  <div key={index} className="p-4 md:p-6 hover:bg-gray-50">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 font-medium text-base md:text-lg">{applicant.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base md:text-lg font-medium text-gray-900 truncate">{applicant.name}</h4>
                            <p className="text-sm md:text-base text-gray-600 truncate">{applicant.position}</p>
                            <div className="text-xs md:text-sm text-gray-500 mt-1 space-y-1">
                              <p className="truncate">{applicant.email} • {applicant.phone}</p>
                              <p>{applicant.experience} experience • Applied {applicant.applied}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <span className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full whitespace-nowrap ${
                          applicant.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          applicant.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                          applicant.status === 'interview' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {applicant.status === 'new' ? 'New' :
                           applicant.status === 'review' ? 'Under Review' :
                           applicant.status === 'interview' ? 'Interview' : 'Hired'}
                        </span>
                        <div className="flex space-x-2">
                          <button className="bg-red-50 text-red-600 px-3 py-1 rounded text-xs md:text-sm hover:bg-red-100 transition-colors whitespace-nowrap">
                            View CV
                          </button>
                          <button className="bg-gray-50 text-gray-600 px-3 py-1 rounded text-xs md:text-sm hover:bg-gray-100 transition-colors whitespace-nowrap">
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600">View business performance and analytics</p>
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>This year</option>
              </select>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-lg md:text-2xl font-bold text-green-600">$28,420</p>
                  </div>
                  <div className="text-green-500">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-green-600 mt-2">↗ 12% from last month</p>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">148</p>
                  </div>
                  <div className="text-blue-500">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-blue-600 mt-2">↗ 8% from last month</p>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-600">Customer Satisfaction</p>
                    <p className="text-lg md:text-2xl font-bold text-yellow-600">4.9</p>
                  </div>
                  <div className="text-yellow-500">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-yellow-600 mt-2">→ Same as last month</p>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-600">Avg. Booking Value</p>
                    <p className="text-lg md:text-2xl font-bold text-purple-600">$192</p>
                  </div>
                  <div className="text-purple-500">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-purple-600 mt-2">↗ 5% from last month</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
                <div className="h-48 md:h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-2-2 4-2-3-1 2H5V5z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">Chart visualization would go here</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Service Breakdown</h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { service: "End of Lease Cleaning", percentage: 35, count: 52 },
                    { service: "Carpet Cleaning", percentage: 25, count: 37 },
                    { service: "Window Cleaning", percentage: 20, count: 30 },
                    { service: "Pressure Washing", percentage: 15, count: 22 },
                    { service: "Gutter Cleaning", percentage: 5, count: 7 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-600 flex-1 truncate pr-2">{item.service}</span>
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-900 w-8 md:w-12 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Configure your system settings and preferences</p>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Business Settings */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Business Information</h3>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input 
                      type="text" 
                      value="iLovah Cleaning Services"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value="04 7871 1829"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value="ilovahcleaning@gmail.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Business Address</label>
                    <textarea 
                      rows="3"
                      value="4 Kelfield Street, North Toowoomba QLD, Australia"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    ></textarea>
                  </div>
                  <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { label: "New Booking Notifications", checked: true },
                    { label: "Payment Confirmations", checked: true },
                    { label: "Customer Messages", checked: true },
                    { label: "Daily Summary Reports", checked: false },
                    { label: "Weekly Analytics", checked: true },
                    { label: "Job Application Alerts", checked: true }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-700 truncate pr-3">{setting.label}</span>
                      <button 
                        className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${
                          setting.checked ? 'bg-red-500' : 'bg-gray-200'
                        }`}
                      >
                        <span 
                          className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                            setting.checked ? 'translate-x-5 md:translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Account & Security</h3>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Admin Username</label>
                    <input 
                      type="text" 
                      value="admin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter current password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter new password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <button className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                    Update Password
                  </button>
                  <hr className="my-4" />
                  <div className="space-y-2">
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-xs md:text-sm">
                      Export Data
                    </button>
                    <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs md:text-sm">
                      System Backup
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Business Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3 md:space-y-4">
                  {[
                    { day: "Monday", hours: "7:00 AM - 7:00 PM" },
                    { day: "Tuesday", hours: "7:00 AM - 7:00 PM" },
                    { day: "Wednesday", hours: "7:00 AM - 7:00 PM" },
                    { day: "Thursday", hours: "7:00 AM - 7:00 PM" }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-xs md:text-sm font-medium text-gray-700 w-full sm:w-20">{item.day}</span>
                      <input 
                        type="text" 
                        value={item.hours}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-xs md:text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { day: "Friday", hours: "7:00 AM - 7:00 PM" },
                    { day: "Saturday", hours: "7:00 AM - 7:00 PM" },
                    { day: "Sunday", hours: "7:00 AM - 7:00 PM" },
                    { day: "Holidays", hours: "Closed" }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-xs md:text-sm font-medium text-gray-700 w-full sm:w-20">{item.day}</span>
                      <input 
                        type="text" 
                        value={item.hours}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-xs md:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 md:mt-6">
                <button className="bg-red-500 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                  Update Hours
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="iLovah Cleaning Logo"
              className="w-8 h-8 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                <span className="text-red-600">iLovah</span> Admin
              </h1>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === item.id
                  ? 'bg-red-100 text-red-700 border-r-2 border-red-500'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {item.name}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              View Site
            </Link>
            <button 
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page title for mobile */}
            <h1 className="lg:hidden text-lg font-semibold text-gray-900 capitalize">
              {activeSection}
            </h1>

            {/* User info */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, Admin</span>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-red-600">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default Admin