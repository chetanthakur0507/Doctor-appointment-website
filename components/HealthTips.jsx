'use client';
import { FaAppleAlt, FaDumbbell, FaBed, FaTint, FaBrain, FaHeartbeat } from 'react-icons/fa';

export default function HealthTips() {
  const tips = [
    {
      icon: <FaAppleAlt className="text-4xl" />,
      title: 'Balanced Diet',
      tip: 'Eat 5 servings of fruits and vegetables daily',
      description: 'A nutritious diet is the foundation of good health',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: <FaDumbbell className="text-4xl" />,
      title: 'Regular Exercise',
      tip: 'Exercise at least 30 minutes daily',
      description: 'Physical activity strengthens your body and mind',
      color: 'from-orange-400 to-red-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: <FaBed className="text-4xl" />,
      title: 'Quality Sleep',
      tip: 'Get 7-8 hours of sleep every night',
      description: 'Good sleep is essential for recovery and health',
      color: 'from-indigo-400 to-purple-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: <FaTint className="text-4xl" />,
      title: 'Stay Hydrated',
      tip: 'Drink 8-10 glasses of water daily',
      description: 'Proper hydration keeps your body functioning optimally',
      color: 'from-cyan-400 to-blue-600',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: <FaBrain className="text-4xl" />,
      title: 'Mental Wellness',
      tip: 'Practice meditation and stress management',
      description: 'Mental health is as important as physical health',
      color: 'from-pink-400 to-rose-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      title: 'Regular Checkups',
      tip: 'Get health screenings annually',
      description: 'Prevention is better than cure - stay proactive',
      color: 'from-red-400 to-pink-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Health & Wellness</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
            Daily <span className="text-blue-600">Health Tips</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Simple yet effective tips to maintain a healthy lifestyle and prevent diseases
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tips.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 group`}
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className={`text-lg font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-3`}>
                💡 {item.tip}
              </p>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Health Quote Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <div className="text-6xl mb-6">🏥</div>
            <blockquote className="text-2xl md:text-3xl font-bold mb-4 italic">
              "Health is not just about what you're eating. It's also about what you're thinking and saying."
            </blockquote>
            <p className="text-lg opacity-90">- Anonymous</p>
          </div>
        </div>

        {/* Quick Health Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: '🥗', value: '5+', label: 'Fruits & Veggies/Day' },
            { icon: '💪', value: '30min', label: 'Daily Exercise' },
            { icon: '💧', value: '8-10', label: 'Glasses of Water' },
            { icon: '😴', value: '7-8hrs', label: 'Quality Sleep' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
