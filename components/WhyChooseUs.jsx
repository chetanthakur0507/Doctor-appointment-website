'use client';
import { FaAward, FaUserMd, FaClock, FaHeart } from 'react-icons/fa';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserMd className="text-5xl text-blue-600" />,
      title: 'Expert Doctors',
      description: 'Our team consists of highly qualified and experienced medical professionals',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <FaClock className="text-5xl text-green-600" />,
      title: '24/7 Service',
      description: 'Round-the-clock medical care and emergency services available',
      color: 'from-green-500 to-green-700'
    },
    {
      icon: <FaAward className="text-5xl text-purple-600" />,
      title: 'Award Winning',
      description: 'Recognized for excellence in healthcare and patient satisfaction',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: <FaHeart className="text-5xl text-red-600" />,
      title: 'Patient Care',
      description: 'Compassionate care with a focus on patient comfort and wellbeing',
      color: 'from-red-500 to-red-700'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Strengths</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
            Why Choose <span className="text-blue-600">Our Hospital</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We are committed to providing world-class healthcare services with cutting-edge technology and compassionate care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className={`mt-6 h-1 w-16 bg-gradient-to-r ${feature.color} rounded-full group-hover:w-full transition-all duration-300`}></div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Trusted by 50,000+ Patients</h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-6">
            Join thousands of satisfied patients who have experienced exceptional healthcare with us
          </p>
          <div className="flex flex-wrap justify-center gap-12 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-sm opacity-90 mt-1">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">50K+</div>
              <div className="text-sm opacity-90 mt-1">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">25+</div>
              <div className="text-sm opacity-90 mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">100+</div>
              <div className="text-sm opacity-90 mt-1">Awards Won</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
