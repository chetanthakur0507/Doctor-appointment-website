"use client";

import Link from "next/link";

const specialties = [
  { name: "Cardiology", icon: "❤️", link: "/Doctors?dept=Cardiology" },
  { name: "Pediatrics", icon: "👶", link: "/Doctors?dept=Pediatrics" },
  { name: "Dermatology", icon: "✨", link: "/Doctors?dept=Dermatology" },
  { name: "Orthopedics", icon: "🦴", link: "/Doctors?dept=Orthopedics" },
  { name: "Neurology", icon: "🧠", link: "/Doctors?dept=Neurology" },
  { name: "General", icon: "⚕️", link: "/Doctors" },
];

export default function Specialties() {
  return (
    <section className="px-4 sm:px-8 py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Top Specialties</h2>
          <p className="text-gray-600">Choose from our wide range of medical specialties</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((item, index) => (
            <Link 
              key={item.name} 
              href={item.link}
              className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
