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
  const [whatsappHover, setWhatsappHover] = useState(false);

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

  const whatsappNumber = "+91 7820022516";
  const whatsappMessage = "Hello! I would like to ask something.";

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleWhatsApp}
          onMouseEnter={() => setWhatsappHover(true)}
          onMouseLeave={() => setWhatsappHover(false)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all transform hover:scale-110 flex items-center justify-center"
          title="Chat with us on WhatsApp"
          aria-label="WhatsApp"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.924 1.44c-.658.362-1.267.839-1.767 1.418C2.847 9.903 1.514 12.345 1.514 15.032c0 1.465.356 2.867 1.016 4.129L1.432 23.5l4.747-1.245c1.188.64 2.531.992 3.935.992h.004c4.993 0 9.05-4.057 9.05-9.05 0-2.415-.936-4.684-2.639-6.387s-3.972-2.639-6.387-2.639z" />
          </svg>
        </button>
        {whatsappHover && (
          <div className="absolute bottom-full right-0 mb-3 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap animate-fade-in-up pointer-events-none">
            WhatsApp par msg bhejein
            <div className="absolute top-full right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
          </div>
        )}
      </div>

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

        {/* Map Section */}
        <div className="mt-16 max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">📍 Find Us on Map</h3>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1190.0538123561018!2d78.9706934614969!3d28.464354177970662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI3JzUyLjAiTiA3OMKwNTgnMTcuMyJF!5e1!3m2!1sen!2sin!4v1769685945169!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 bg-white rounded-xl shadow-md p-6 animate-fade-in-up">
            <h4 className="text-xl font-bold text-gray-800 mb-4">📌 Clinic Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 font-semibold mb-2">Address:</p>
                <p className="text-gray-600">123 Healthcare Way</p>
                <p className="text-gray-600">Medical District, City 12345</p>
                <p className="text-gray-600 mt-3 font-semibold">Coordinates:</p>
                <p className="text-gray-600">Latitude: 26.9124°N</p>
                <p className="text-gray-600">Longitude: 75.8649°E</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold mb-2">Getting Here:</p>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>Located in Medical District center</li>
                  <li>Easy access from main road</li>
                  <li>Ample parking available</li>
                  <li>Near public transportation</li>
                </ul>
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
