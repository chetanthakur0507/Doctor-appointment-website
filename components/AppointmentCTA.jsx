'use client';
import Link from 'next/link';
import { FaCalendarCheck, FaUserMd, FaClock, FaArrowRight } from 'react-icons/fa';

export default function AppointmentCTA() {
  const steps = [
    {
      icon: <FaUserMd className="text-4xl" />,
      title: 'Choose Doctor',
      description: 'Select from our expert specialists',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaCalendarCheck className="text-4xl" />,
      title: 'Pick Date & Time',
      description: 'Choose a convenient slot',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FaClock className="text-4xl" />,
      title: 'Get Confirmation',
      description: 'Receive instant confirmation',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Book Now</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Schedule Your Appointment
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Quick and easy online booking - get your appointment confirmed in just 3 simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-xl`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-blue-200">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <FaArrowRight className="hidden md:block absolute top-1/2 -right-8 text-3xl text-cyan-400 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-3">
                  Ready to Book Your Appointment?
                </h3>
                <p className="text-xl text-blue-100">
                  Join thousands of patients receiving quality healthcare
                </p>
                <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm text-blue-100">+10,000 Patients this month</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/user/appointments/book"
                  className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <FaCalendarCheck className="text-2xl group-hover:scale-110 transition-transform" />
                  Book Appointment
                </Link>
                <Link
                  href="/Doctors"
                  className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  View All Doctors
                </Link>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Instant Booking', value: '100%' },
              { label: 'Online', value: '24/7' },
              { label: 'Expert Doctors', value: '500+' },
              { label: 'Response Time', value: '<1min' }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{item.value}</div>
                <div className="text-sm text-blue-200">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
