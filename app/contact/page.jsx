"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        
        setTimeout(() => setSuccess(false), 8000);
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send message. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Get in touch with our team. We are here to help you with any questions or concerns.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>
            
            <div className="space-y-6 mb-8">
              {/* Phone */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm mb-2">Available 24/7 for emergencies</p>
                  <p className="text-blue-600 font-bold">+1 (555) 000-1234</p>
                  <p className="text-gray-600 text-sm mt-1">Emergency: +1 (555) 999-9999</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  📧
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 text-sm mb-2">Response within 24 hours</p>
                  <p className="text-green-600 font-bold">support@medicare.com</p>
                  <p className="text-gray-600 text-sm mt-1">General: info@medicare.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Address</h3>
                  <p className="text-gray-600 text-sm mb-2">Visit us during office hours</p>
                  <p className="text-purple-600 font-bold">123 Healthcare Way</p>
                  <p className="text-gray-600 text-sm">Medical District, City 12345</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  🕐
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Office Hours</h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                    <p className="text-orange-600 font-semibold mt-2">Emergency: 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <button className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl hover:bg-blue-200 transition">
                  📘
                </button>
                <button className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl hover:bg-blue-200 transition">
                  🐦
                </button>
                <button className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl hover:bg-pink-200 transition">
                  📷
                </button>
                <button className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl hover:bg-blue-200 transition">
                  💼
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up animation-delay-200">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                <p className="text-blue-100 mt-2">Fill out the form below and we will get back to you soon</p>
              </div>

              <div className="p-8">
                {success && (
                  <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-6 animate-fade-in-up flex items-start gap-3">
                    <span className="text-xl">✅</span>
                    <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 animate-fade-in-up flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all bg-white"
                      required
                    >
                      <option value="">Select a subject...</option>
                      <option value="appointment">Appointment Inquiry</option>
                      <option value="medical">Medical Question</option>
                      <option value="billing">Billing & Insurance</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                      rows="5"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-16 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-64 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold mb-2">Find Us on Map</h3>
                <p className="text-blue-100">123 Healthcare Way, Medical District</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center animate-fade-in-up">Need More Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/help" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">❓</div>
              <h4 className="font-bold text-gray-800 mb-2">Help Center</h4>
              <p className="text-gray-600 text-sm">Browse our help articles</p>
            </Link>
            <Link href="/faqs" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">💬</div>
              <h4 className="font-bold text-gray-800 mb-2">FAQs</h4>
              <p className="text-gray-600 text-sm">Common questions answered</p>
            </Link>
            <Link href="/user/appointments/book" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">📅</div>
              <h4 className="font-bold text-gray-800 mb-2">Book Appointment</h4>
              <p className="text-gray-600 text-sm">Schedule a consultation</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
