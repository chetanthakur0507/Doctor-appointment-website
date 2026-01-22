"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");

  const helpTopics = [
    {
      id: 1,
      category: "Getting Started",
      title: "Creating Your Account",
      description: "Learn how to register and set up your patient account with all necessary information.",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
      steps: [
        "Click 'Sign Up / Login' in the navigation menu",
        "Fill in your personal details (name, email, password)",
        "Verify your email address",
        "Complete your profile with medical history"
      ]
    },
    {
      id: 2,
      category: "Getting Started",
      title: "Booking Your First Appointment",
      description: "Step-by-step guide to scheduling your first consultation with our doctors.",
      icon: "📅",
      color: "from-blue-500 to-cyan-500",
      steps: [
        "Log into your account",
        "Navigate to 'Book Appointment' page",
        "Select your preferred doctor and specialty",
        "Choose date and time slot",
        "Add any relevant notes or symptoms",
        "Confirm your booking"
      ]
    },
    {
      id: 3,
      category: "Appointments",
      title: "Managing Your Appointments",
      description: "View, reschedule, or cancel your appointments from your dashboard.",
      icon: "📋",
      color: "from-green-500 to-emerald-500",
      steps: [
        "Go to your User Dashboard",
        "View all upcoming and past appointments",
        "Click 'Cancel' to cancel an appointment",
        "Book a new appointment to reschedule"
      ]
    },
    {
      id: 4,
      category: "Appointments",
      title: "Preparing for Your Visit",
      description: "Important information about what to bring and how to prepare for your appointment.",
      icon: "🏥",
      color: "from-green-500 to-emerald-500",
      steps: [
        "Bring a valid photo ID and insurance card",
        "Arrive 10-15 minutes early",
        "Bring list of current medications",
        "Prepare questions for your doctor",
        "Bring relevant medical records or test results"
      ]
    },
    {
      id: 5,
      category: "Payments & Insurance",
      title: "Understanding Payment Options",
      description: "Learn about accepted payment methods and how to pay for services.",
      icon: "💳",
      color: "from-purple-500 to-indigo-500",
      steps: [
        "We accept cash, credit/debit cards, and UPI",
        "Payment is due at time of service",
        "Request itemized bills at checkout",
        "Save payment receipts for insurance claims"
      ]
    },
    {
      id: 6,
      category: "Payments & Insurance",
      title: "Using Health Insurance",
      description: "How to use your health insurance for consultations and treatments.",
      icon: "🏥",
      color: "from-purple-500 to-indigo-500",
      steps: [
        "Bring your insurance card and ID",
        "Inform the receptionist about insurance",
        "Our team will verify your coverage",
        "You pay copay/deductible amount",
        "We'll file the claim on your behalf"
      ]
    },
    {
      id: 7,
      category: "Medical Records",
      title: "Accessing Your Medical Records",
      description: "Learn how to view and download your medical records and test results.",
      icon: "📄",
      color: "from-orange-500 to-red-500",
      steps: [
        "Log into your account dashboard",
        "Navigate to 'Medical Records' section",
        "View or download reports",
        "Request copies if needed",
        "Contact support for assistance"
      ]
    },
    {
      id: 8,
      category: "Medical Records",
      title: "Sharing Records with Doctors",
      description: "How to securely share your medical history with healthcare providers.",
      icon: "📤",
      color: "from-orange-500 to-red-500",
      steps: [
        "Upload documents in your profile",
        "Select records to share",
        "Doctors can access during consultation",
        "Control who can view your records"
      ]
    },
    {
      id: 9,
      category: "Technical Support",
      title: "Troubleshooting Login Issues",
      description: "Solutions for common login and password problems.",
      icon: "🔐",
      color: "from-pink-500 to-rose-500",
      steps: [
        "Check your email and password",
        "Use 'Forgot Password' if needed",
        "Clear browser cache and cookies",
        "Try a different browser",
        "Contact support if issue persists"
      ]
    },
    {
      id: 10,
      category: "Technical Support",
      title: "Using Video Consultations",
      description: "Guide to accessing and using our telemedicine services.",
      icon: "💻",
      color: "from-pink-500 to-rose-500",
      steps: [
        "Book appointment with 'Video Call' option",
        "Test your camera and microphone",
        "Join from your dashboard at appointment time",
        "Click the 'Join Video Call' link",
        "Ensure stable internet connection"
      ]
    }
  ];

  const categories = ["All", "Getting Started", "Appointments", "Payments & Insurance", "Medical Records", "Technical Support"];

  const filteredTopics = helpTopics.filter((topic) => {
    const matchesCategory = selectedTopic === "All" || topic.category === selectedTopic;
    const matchesSearch = 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Help Center</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Find guides, tutorials, and answers to help you make the most of our healthcare services.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="animate-fade-in-up animation-delay-100">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedTopic(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedTopic === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-300"
                    : "bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Header */}
                <div className={`bg-gradient-to-r ${topic.color} h-32 flex items-center justify-center text-6xl relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 animate-pulse"></div>
                  <span className="relative z-10">{topic.icon}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${topic.color} text-white`}>
                      {topic.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{topic.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{topic.description}</p>

                  {/* Steps */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Quick Steps:</p>
                    <ul className="space-y-2">
                      {topic.steps.slice(0, 3).map((step, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                      {topic.steps.length > 3 && (
                        <li className="text-sm text-blue-600 font-semibold">
                          +{topic.steps.length - 3} more steps
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-gray-500 font-semibold">
                No help topics found for &quot;{searchTerm}&quot;. Try a different search!
              </p>
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/faqs" className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              <span className="text-2xl">❓</span>
              <span className="font-semibold text-gray-800">FAQs</span>
            </Link>
            <Link href="/Doctors" className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
              <span className="text-2xl">👨‍⚕️</span>
              <span className="font-semibold text-gray-800">Our Doctors</span>
            </Link>
            <Link href="/departments" className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <span className="text-2xl">🏥</span>
              <span className="font-semibold text-gray-800">Departments</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
              <span className="text-2xl">📞</span>
              <span className="font-semibold text-gray-800">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-white py-16 border-t">
        <div className="px-4 sm:px-10 lg:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in-up">Need More Help?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Can not find what you are looking for? Our support team is available 24/7 to assist you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-xl p-6 animate-fade-in-up animation-delay-100 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-3">24/7 Support</p>
              <p className="text-blue-600 font-bold">+1 (555) 000-1234</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 animate-fade-in-up animation-delay-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">Response within 24h</p>
              <p className="text-green-600 font-bold">support@medicare.com</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 animate-fade-in-up animation-delay-300 hover:shadow-lg transition">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-bold text-gray-800 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-3">Chat with our team</p>
              <button className="text-purple-600 font-bold hover:underline">Start Chat →</button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="px-4 sm:px-10 lg:px-20 text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience quality healthcare with our expert doctors.
          </p>
          <Link
            href="/user/appointments/book"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
          >
            Book Appointment Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
