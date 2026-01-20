'use client';
import Link from 'next/link';
import { FaStethoscope, FaXRay, FaSyringe, FaPills, FaAmbulance, FaHospital, FaMicroscope, FaHeartbeat } from 'react-icons/fa';

export default function OurServices() {
  const services = [
    {
      icon: <FaStethoscope className="text-5xl" />,
      title: 'General Consultation',
      description: 'Comprehensive health checkups and consultations with experienced physicians',
      features: ['Initial Assessment', 'Health Screening', 'Medical Advice'],
      color: 'from-blue-500 to-cyan-600',
      link: '/departments'
    },
    {
      icon: <FaXRay className="text-5xl" />,
      title: 'Diagnostic Services',
      description: 'Advanced imaging and diagnostic facilities with latest technology',
      features: ['X-Ray', 'CT Scan', 'MRI', 'Ultrasound'],
      color: 'from-purple-500 to-pink-600',
      link: '/departments'
    },
    {
      icon: <FaMicroscope className="text-5xl" />,
      title: 'Laboratory Tests',
      description: 'Complete pathology and laboratory services with accurate results',
      features: ['Blood Tests', 'Urine Analysis', 'Biopsy'],
      color: 'from-green-500 to-teal-600',
      link: '/departments'
    },
    {
      icon: <FaHospital className="text-5xl" />,
      title: 'Surgical Procedures',
      description: 'State-of-the-art operation theatres with expert surgical team',
      features: ['Minor Surgery', 'Major Surgery', 'Post-Op Care'],
      color: 'from-orange-500 to-red-600',
      link: '/departments'
    },
    {
      icon: <FaAmbulance className="text-5xl" />,
      title: 'Emergency Care',
      description: '24/7 emergency services with rapid response and expert trauma care',
      features: ['Immediate Care', 'Trauma Unit', 'Critical Care'],
      color: 'from-red-500 to-rose-600',
      link: '/departments'
    },
    {
      icon: <FaHeartbeat className="text-5xl" />,
      title: 'Cardiac Care',
      description: 'Specialized cardiac care unit with advanced monitoring equipment',
      features: ['ECG', 'Echo', 'Cardiac Surgery'],
      color: 'from-pink-500 to-purple-600',
      link: '/departments'
    },
    {
      icon: <FaSyringe className="text-5xl" />,
      title: 'Vaccination',
      description: 'Complete immunization services for all age groups',
      features: ['Child Vaccines', 'Adult Vaccines', 'Travel Vaccines'],
      color: 'from-cyan-500 to-blue-600',
      link: '/departments'
    },
    {
      icon: <FaPills className="text-5xl" />,
      title: 'Pharmacy',
      description: 'In-house pharmacy with all prescribed medications available',
      features: ['Generic Drugs', 'Branded Medicine', 'Home Delivery'],
      color: 'from-indigo-500 to-purple-600',
      link: '/departments'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
            Comprehensive <span className="text-blue-600">Healthcare Solutions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We offer a wide range of medical services with cutting-edge technology and experienced healthcare professionals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-2`}></span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                href={service.link}
                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group-hover:gap-2 gap-1"
              >
                Learn More
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Insurance Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-3">Insurance Accepted</h3>
              <p className="text-green-100 mb-6">
                We accept most major insurance plans. Contact us to verify your coverage.
              </p>
              <Link
                href="/departments"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
              >
                Check Coverage
              </Link>
            </div>
          </div>

          {/* Book Appointment Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-3">Need a Service?</h3>
              <p className="text-blue-100 mb-6">
                Book an appointment online and get instant confirmation from our team.
              </p>
              <Link
                href="/user/appointments/book"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
