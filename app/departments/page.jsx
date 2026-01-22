"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Department color mappings
  const departmentColors = {
    "cardiology": { color: "from-red-500 to-pink-500", bg: "bg-red-50", icon: "🫀" },
    "neurology": { color: "from-purple-500 to-indigo-500", bg: "bg-purple-50", icon: "🧠" },
    "orthopedics": { color: "from-blue-500 to-cyan-500", bg: "bg-blue-50", icon: "🦴" },
    "dermatology": { color: "from-yellow-500 to-orange-500", bg: "bg-yellow-50", icon: "💆" },
    "gastroenterology": { color: "from-green-500 to-emerald-500", bg: "bg-green-50", icon: "🍽️" },
    "pediatrics": { color: "from-pink-500 to-rose-500", bg: "bg-pink-50", icon: "👶" },
    "oncology": { color: "from-indigo-500 to-purple-500", bg: "bg-indigo-50", icon: "💊" },
    "pulmonology": { color: "from-cyan-500 to-blue-500", bg: "bg-cyan-50", icon: "🫁" },
  };

  const getColorForDept = (deptName) => {
    const key = deptName.toLowerCase().replace(/\s+/g, "");
    return departmentColors[key] || { color: "from-blue-500 to-cyan-500", bg: "bg-blue-50", icon: "🏥" };
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/doctors");
      const doctors = await res.json();

      // Get unique departments with doctor count
      const deptMap = {};
      doctors.forEach((doc) => {
        const dept = doc.department;
        if (!deptMap[dept]) {
          deptMap[dept] = {
            name: dept,
            count: 0,
            specialization: doc.specialization,
          };
        }
        deptMap[dept].count++;
      });

      // Convert to array
      const deptArray = Object.keys(deptMap).map((key) => ({
        title: key,
        desc: `Specialized ${deptMap[key].specialization || key} care with ${deptMap[key].count} expert doctor${deptMap[key].count > 1 ? 's' : ''}.`,
        slug: key.toLowerCase(),
        count: deptMap[key].count,
      }));

      setDepartments(deptArray);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Medical Departments</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Explore our {departments.length} specialized departments with expert healthcare professionals ready to serve you.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Action Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="animate-fade-in-up animation-delay-100">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>

          {/* Emergency CTA */}
          <div className="mb-12 animate-slide-in-right">
            <Link 
              href="/user/appointments/book" 
              className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all shadow-lg"
            >
              🚨 Book Emergency Care
            </Link>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept, index) => {
              const deptColor = getColorForDept(dept.title);
              return (
                <div
                  key={dept.slug}
                  className="animate-fade-in-up group cursor-pointer h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link href={`/Doctors?dept=${dept.title}`}>
                    <div className={`${deptColor.bg} rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col`}>
                      {/* Icon Section */}
                      <div className={`bg-gradient-to-r ${deptColor.color} h-40 flex items-center justify-center text-6xl relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20 animate-pulse"></div>
                        <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                          {deptColor.icon}
                        </span>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                          {dept.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-6 flex-grow">
                          {dept.desc}
                        </p>

                        {/* Doctor Count */}
                        <div className="border-t pt-4 mb-4">
                          <p className="text-sm font-semibold text-gray-700">
                            👨‍⚕️ {dept.count} Doctor{dept.count > 1 ? 's' : ""} Available
                          </p>
                        </div>

                        {/* CTA Button */}
                        <button className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${deptColor.color} hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer`}>
                          View Doctors →
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-gray-500 font-semibold">
                No departments found for &quot;{searchTerm}&quot;. Try a different search!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-white py-16 mt-20 border-t">
        <div className="px-4 sm:px-10 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 animate-fade-in-up">Why Choose Our Departments?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up animation-delay-100">
              <div className="inline-block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
                ⭐
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Doctors</h3>
              <p className="text-gray-600">Highly qualified specialists with years of experience in their fields.</p>
            </div>

            <div className="text-center animate-fade-in-up animation-delay-200">
              <div className="inline-block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
                🏥
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Modern Facilities</h3>
              <p className="text-gray-600">State-of-the-art medical equipment and comfortable treatment environment.</p>
            </div>

            <div className="text-center animate-fade-in-up animation-delay-300">
              <div className="inline-block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
                🕐
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock patient care and emergency support services available.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="px-4 sm:px-10 lg:px-20 text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Can not find the department you need?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our patient care team is available 24/7 to assist you in finding the right specialist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/Doctors"
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              View All Doctors
            </Link>
            <Link
              href="/user/appointments/book"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
