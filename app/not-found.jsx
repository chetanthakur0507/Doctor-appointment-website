"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className={`relative z-10 text-center max-w-md md:max-w-2xl transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        {/* 404 with Animation */}
        <div className="mb-8 relative">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-blue-600 blur-xl opacity-30 animate-pulse"></div>
        </div>

        {/* Emoji Animation */}
        <div className="mb-8">
          <div className="text-6xl md:text-7xl animate-bounce inline-block">
            🔍
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          The page you&apos;re looking for seems to have wandered off to another dimension. 
          <br className="hidden sm:block" />
          Let&apos;s get you back on track! 🚀
        </p>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm text-red-700">
            <span className="font-bold">Error:</span> This route does not exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>🏠</span>
            Back to Home
          </Link>
          
          <Link
            href="/Doctors"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>👨‍⚕️</span>
            Find Doctors
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/user/appointments/book"
            className="px-4 py-2 bg-white border-2 border-blue-200 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all text-sm"
          >
            📅 Book Appointment
          </Link>
          <Link
            href="/departments"
            className="px-4 py-2 bg-white border-2 border-green-200 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all text-sm"
          >
            🏥 Departments
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 bg-white border-2 border-purple-200 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all text-sm"
          >
            📞 Contact Us
          </Link>
          <Link
            href="/faqs"
            className="px-4 py-2 bg-white border-2 border-orange-200 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all text-sm"
          >
            ❓ FAQs
          </Link>
        </div>

        {/* Footer Message */}
        <p className="mt-8 text-sm text-gray-500">
          Need help? <Link href="/contact" className="text-blue-600 font-semibold hover:underline">Contact us</Link>
        </p>
      </div>

      {/* Floating Doctor Icon */}
      <div className="absolute bottom-10 right-10 text-6xl animate-bounce opacity-30">
        💊
      </div>
    </div>
  );
}
