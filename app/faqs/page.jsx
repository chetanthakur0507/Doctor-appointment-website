"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqs = [
    {
      id: 1,
      category: "Appointments",
      question: "How do I book an appointment?",
      answer: "You can book an appointment by visiting our 'Book Appointment' page, selecting your preferred doctor, choosing a date and time slot, and confirming your booking. You'll receive a confirmation email once your appointment is successfully booked.",
      color: "from-blue-500 to-cyan-500",
      icon: "📅"
    },
    {
      id: 2,
      category: "Appointments",
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel your appointment from your dashboard. To reschedule, please cancel your current appointment and book a new one with your preferred date and time. We recommend doing this at least 24 hours in advance.",
      color: "from-blue-500 to-cyan-500",
      icon: "🔄"
    },
    {
      id: 3,
      category: "Appointments",
      question: "What if I'm late for my appointment?",
      answer: "We understand that delays happen. However, if you're more than 15 minutes late, your appointment may need to be rescheduled to accommodate other patients. Please contact us as soon as possible if you're running late.",
      color: "from-blue-500 to-cyan-500",
      icon: "⏰"
    },
    {
      id: 4,
      category: "Payments",
      question: "What are the payment options available?",
      answer: "We accept various payment methods including cash, credit/debit cards, UPI, and digital wallets. Payment is typically required at the time of consultation unless you have insurance coverage.",
      color: "from-green-500 to-emerald-500",
      icon: "💳"
    },
    {
      id: 5,
      category: "Payments",
      question: "Do you accept health insurance?",
      answer: "Yes, we work with most major health insurance providers. Please bring your insurance card and ID to your appointment. Our billing team will help you understand your coverage and process claims.",
      color: "from-green-500 to-emerald-500",
      icon: "🏥"
    },
    {
      id: 6,
      category: "Payments",
      question: "Can I get a refund if I cancel my appointment?",
      answer: "If you cancel at least 24 hours before your scheduled appointment, you may be eligible for a full refund. Cancellations made less than 24 hours in advance may incur a cancellation fee. Please check our cancellation policy for details.",
      color: "from-green-500 to-emerald-500",
      icon: "💰"
    },
    {
      id: 7,
      category: "Doctors",
      question: "How do I choose the right doctor for my condition?",
      answer: "You can browse our doctors by department or specialization. Each doctor's profile includes their qualifications, experience, and areas of expertise. If you're unsure, our patient support team can help recommend the right specialist for your needs.",
      color: "from-purple-500 to-indigo-500",
      icon: "👨‍⚕️"
    },
    {
      id: 8,
      category: "Doctors",
      question: "Are all doctors board-certified?",
      answer: "Yes, all our doctors are board-certified and have extensive experience in their respective fields. They maintain active medical licenses and participate in continuing education to stay current with the latest medical advances.",
      color: "from-purple-500 to-indigo-500",
      icon: "⭐"
    },
    {
      id: 9,
      category: "Doctors",
      question: "Can I request a specific doctor?",
      answer: "Absolutely! When booking your appointment, you can select your preferred doctor from the dropdown menu. If your chosen doctor is not available on your preferred date, you can choose another date or select a different doctor in the same specialty.",
      color: "from-purple-500 to-indigo-500",
      icon: "✅"
    },
    {
      id: 10,
      category: "Services",
      question: "What medical services do you offer?",
      answer: "We offer comprehensive healthcare services across multiple specialties including cardiology, neurology, orthopedics, dermatology, pediatrics, and more. Visit our Departments page to see our full range of services and specialties.",
      color: "from-orange-500 to-red-500",
      icon: "🏨"
    },
    {
      id: 11,
      category: "Services",
      question: "Do you provide emergency services?",
      answer: "Yes, we have 24/7 emergency services available. For emergencies, please call our emergency hotline or visit our emergency department directly. For urgent but non-emergency matters, you can book a same-day appointment.",
      color: "from-orange-500 to-red-500",
      icon: "🚨"
    },
    {
      id: 12,
      category: "Services",
      question: "Do you offer telemedicine consultations?",
      answer: "Yes, we offer virtual consultations for many conditions. When booking your appointment, you can select 'Video Consultation' as your appointment type. You'll receive a link to join the video call at your scheduled time.",
      color: "from-orange-500 to-red-500",
      icon: "💻"
    },
    {
      id: 13,
      category: "Account",
      question: "How do I create an account?",
      answer: "Click on 'Sign Up / Login' in the navigation menu, then select 'Register'. Fill in your details including name, email, and password. You'll receive a verification email to activate your account.",
      color: "from-pink-500 to-rose-500",
      icon: "👤"
    },
    {
      id: 14,
      category: "Account",
      question: "I forgot my password. What should I do?",
      answer: "On the login page, click 'Forgot Password'. Enter your registered email address, and we'll send you instructions to reset your password. Follow the link in the email to create a new password.",
      color: "from-pink-500 to-rose-500",
      icon: "🔐"
    },
    {
      id: 15,
      category: "Account",
      question: "How can I update my personal information?",
      answer: "Log into your account and go to your dashboard. From there, you can access your profile settings to update your personal information, contact details, and preferences. Make sure to save your changes before exiting.",
      color: "from-pink-500 to-rose-500",
      icon: "✏️"
    }
  ];

  const categories = ["All", "Appointments", "Payments", "Doctors", "Services", "Account"];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Find answers to common questions about our services, appointments, and healthcare facilities.
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
              placeholder="Search FAQs..."
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
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-300"
                    : "bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                    openIndex === index ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    {/* Question Header */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`bg-gradient-to-r ${faq.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
                          {faq.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-lg">{faq.question}</p>
                          <p className="text-sm text-gray-500 mt-1">{faq.category}</p>
                        </div>
                      </div>
                      <div className={`text-blue-600 text-2xl font-bold transform transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </div>
                    </button>

                    {/* Answer Section */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-500 font-semibold">
                No FAQs found for &#39;{searchTerm}&#39;. Try a different search!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-white py-16 mt-20 border-t">
        <div className="px-4 sm:px-10 lg:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in-up">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Can not find the answer you are looking for? Our support team is here to help you with any questions or concerns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-xl p-6 animate-fade-in-up animation-delay-100">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-3">Available 24/7</p>
              <p className="text-blue-600 font-bold">+1 (555) 000-1234</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 animate-fade-in-up animation-delay-200">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">Response within 24 hours</p>
              <p className="text-green-600 font-bold">support@medicare.com</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 animate-fade-in-up animation-delay-300">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/user/appointments/book"
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Book Appointment
            </Link>
            <Link
              href="/Doctors"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              View Our Doctors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
