'use client';
import { FaPhone, FaAmbulance, FaHospital, FaStethoscope } from 'react-icons/fa';

export default function EmergencyContact() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-600 via-red-700 to-pink-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Emergency Info */}
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <FaAmbulance className="text-5xl animate-pulse" />
              <span className="bg-white text-red-600 px-4 py-1 rounded-full text-sm font-bold uppercase">
                Emergency
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Need Immediate Medical Attention?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Our emergency team is available 24/7 to help you. Don not hesitate to call us anytime.
            </p>

            {/* Emergency Number */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white rounded-full p-4">
                  <FaPhone className="text-3xl text-red-600 animate-bounce" />
                </div>
                <div>
                  <p className="text-sm text-red-100">Emergency Hotline</p>
                  <a href="tel:+911234567890" className="text-4xl font-bold hover:text-yellow-300 transition-colors">
                    +91 123-456-7890
                  </a>
                </div>
              </div>
              <p className="text-sm text-red-100">Available 24 hours a day, 7 days a week</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+911234567890"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2"
              >
                <FaPhone className="text-xl" />
                Call Now
              </a>
              <a
                href="/departments"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center gap-2"
              >
                <FaHospital className="text-xl" />
                Find Department
              </a>
            </div>
          </div>

          {/* Right Side - Quick Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="bg-red-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <FaAmbulance className="text-3xl text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ambulance Service</h3>
              <p className="text-gray-600 text-sm mb-4">
                Fast and equipped ambulances available 24/7 for emergency transport
              </p>
              <a href="tel:+911234567890" className="text-red-600 font-semibold hover:text-red-800 flex items-center gap-2">
                Call for Ambulance →
              </a>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <FaHospital className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Room</h3>
              <p className="text-gray-600 text-sm mb-4">
                State-of-the-art ER facility with experienced trauma care specialists
              </p>
              <a href="/departments" className="text-red-600 font-semibold hover:text-red-800 flex items-center gap-2">
                Visit ER →
              </a>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <FaStethoscope className="text-3xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Critical Care</h3>
              <p className="text-gray-600 text-sm mb-4">
                ICU and critical care units with advanced monitoring systems
              </p>
              <a href="/departments" className="text-red-600 font-semibold hover:text-red-800 flex items-center gap-2">
                Learn More →
              </a>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <FaPhone className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Helpline</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get medical advice and consultation anytime from our experts
              </p>
              <a href="tel:+911234567890" className="text-red-600 font-semibold hover:text-red-800 flex items-center gap-2">
                Contact Now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
