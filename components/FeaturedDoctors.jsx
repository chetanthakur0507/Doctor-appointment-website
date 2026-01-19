"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      // Show only first 4 doctors
      setDoctors((data || []).slice(0, 4));
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="px-4 sm:px-8 py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-8 py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Featured Specialists</h2>
            <p className="text-gray-600">Meet our top-rated medical professionals</p>
          </div>
          <Link 
            href="/Doctors" 
            className="hidden md:inline-block text-blue-600 font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        {doctors.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, index) => (
              <div 
                key={doc._id} 
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                    {doc.name?.charAt(0) || "D"}
                  </div>
                  <div className="absolute bottom-0 right-1/4 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                
                <h4 className="font-bold text-lg text-center mb-1 group-hover:text-blue-600 transition-colors">
                  {doc.name}
                </h4>
                <p className="text-blue-600 text-sm text-center font-medium mb-2">
                  {doc.specialization}
                </p>
                <p className="text-gray-500 text-xs text-center mb-4">
                  {doc.experience} years experience
                </p>
                
                <div className="flex gap-2">
                  <Link 
                    href={`/Doctors/${doc._id}`}
                    className="flex-1 text-center border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition text-sm font-semibold"
                  >
                    View Profile
                  </Link>
                  <Link 
                    href="/user/appointments/book"
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No doctors available at the moment</p>
            <Link href="/Doctors" className="text-blue-600 hover:underline mt-2 inline-block">
              Explore All Doctors
            </Link>
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link 
            href="/Doctors" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}
