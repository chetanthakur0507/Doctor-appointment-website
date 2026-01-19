"use client";

import { useEffect, useState } from "react";

export default function Stats() {
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    years: 0,
    satisfaction: 0
  });

  useEffect(() => {
    // Animate numbers on mount
    const targets = { patients: 50000, doctors: 1200, years: 15, satisfaction: 98 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        patients: Math.floor(targets.patients * progress),
        doctors: Math.floor(targets.doctors * progress),
        years: Math.floor(targets.years * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Patients", value: `${(counts.patients / 1000).toFixed(0)}k+`, icon: "👥" },
    { label: "Doctors", value: `${(counts.doctors / 1000).toFixed(1)}k+`, icon: "👨‍⚕️" },
    { label: "Years Experience", value: `${counts.years}+`, icon: "🏥" },
    { label: "Satisfaction", value: `${counts.satisfaction}%`, icon: "⭐" }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="transform hover:scale-110 transition-transform duration-300"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <p className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-blue-100 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
