"use client";

import { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Patient",
      text: "Booking was so easy. Found a specialist nearby within minutes. The doctor was professional and caring!",
      rating: 5,
      image: "RS"
    },
    {
      name: "Priya Mehta",
      role: "Patient",
      text: "Clean interface and trustworthy doctors. Highly recommended! My experience was excellent.",
      rating: 5,
      image: "PM"
    },
    {
      name: "Amit Kumar",
      role: "Patient",
      text: "Quick appointment booking and great service. The platform made healthcare accessible for me.",
      rating: 5,
      image: "AK"
    },
    {
      name: "Sneha Patel",
      role: "Patient",
      text: "Best healthcare platform I've used. Professional doctors and seamless experience throughout.",
      rating: 5,
      image: "SP"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="px-4 sm:px-8 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Patients Say</h2>
          <p className="text-gray-600">Real experiences from real people</p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              
              <p className="text-gray-700 italic leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                {testimonials[activeIndex].image}
              </div>
              <div>
                <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
                <p className="text-sm text-gray-600">{testimonials[activeIndex].role}</p>
              </div>
            </div>
            
            <div className="flex mb-3">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">⭐</span>
              ))}
            </div>
            
            <p className="text-gray-700 italic leading-relaxed mb-6">
              &ldquo;{testimonials[activeIndex].text}&rdquo;
            </p>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
