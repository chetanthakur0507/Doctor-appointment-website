"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function DoctorsPage() {
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState(["All"]);

  // Department color mappings
  const departmentColors = {
    "cardiology": { color: "from-red-500 to-pink-500", icon: "🫀" },
    "neurology": { color: "from-purple-500 to-indigo-500", icon: "🧠" },
    "orthopedics": { color: "from-blue-500 to-cyan-500", icon: "🦴" },
    "dermatology": { color: "from-yellow-500 to-orange-500", icon: "💆" },
    "gastroenterology": { color: "from-green-500 to-emerald-500", icon: "🍽️" },
    "pediatrics": { color: "from-pink-500 to-rose-500", icon: "👶" },
    "oncology": { color: "from-indigo-500 to-purple-500", icon: "💊" },
    "pulmonology": { color: "from-cyan-500 to-blue-500", icon: "🫁" },
  };

  const getColorForDept = (deptName) => {
    const key = deptName.toLowerCase().replace(/\s+/g, "");
    return departmentColors[key] || { color: "from-blue-500 to-cyan-500", icon: "👨‍⚕️" };
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Check URL params for department filter
    const deptParam = searchParams.get('dept');
    if (deptParam) {
      setSelectedDepartment(deptParam);
    }
  }, [searchParams]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setDoctors(data || []);

      // Extract unique departments
      const uniqueDepts = ["All", ...new Set(data.map(doc => doc.department))];
      setDepartments(uniqueDepts);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = (selectedDepartment === "All" 
    ? doctors 
    : doctors.filter(doc => doc.department === selectedDepartment)
  ).filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Expert Doctors</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Find the best healthcare professionals across {departments.length - 1} specialized departments. Book your consultation today.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="animate-fade-in-up animation-delay-100">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedDepartment === dept
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-300"
                    : "bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 animate-fade-in-up">
            {error}
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => {
              const deptColor = getColorForDept(doctor.department);
              return (
                <div
                  key={doctor._id}
                  className="animate-fade-in-up group h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
                    {/* Header with Gradient */}
                    <div className={`bg-gradient-to-r ${deptColor.color} h-40 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20 animate-pulse"></div>
                      <div className="relative z-10 text-6xl transform group-hover:scale-110 transition-transform duration-500">
                        {deptColor.icon}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Name */}
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {doctor.name}
                      </h3>

                      {/* Specialization Badge */}
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${deptColor.color} text-white`}>
                          {doctor.specialization}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-6 flex-grow">
                        <p className="text-gray-700">
                          <span className="font-semibold">Department:</span> {doctor.department}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Experience:</span> {doctor.experience} years
                        </p>
                        <p className="text-blue-600 font-bold text-lg">
                          💰 ₹{doctor.fees} per visit
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="border-t pt-4 mb-4">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          ⭐ Highly Recommended
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link 
                          href={`/Doctors/${doctor._id}`} 
                          className={`flex-1 text-center py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${deptColor.color} hover:opacity-90 transition-all transform hover:scale-105`}
                        >
                          View Profile
                        </Link>
                        <Link 
                          href="/user/appointments/book" 
                          className="flex-1 text-center py-3 px-4 rounded-lg font-semibold text-blue-600 bg-blue-50 border-2 border-blue-600 hover:bg-blue-100 transition-all transform hover:scale-105"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-gray-500 font-semibold mb-4">
                {searchTerm ? `No doctors found for "${searchTerm}".` : "No doctors found in this department."}
              </p>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-t mt-20">
        <div className="px-4 sm:px-10 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 animate-fade-in-up">Why Our Doctors?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up animation-delay-100">
              <div className="inline-block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
                👨‍⚕️
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Certified Specialists</h3>
              <p className="text-gray-600">Board-certified doctors with international qualifications.</p>
            </div>

            <div className="text-center animate-fade-in-up animation-delay-200">
              <div className="inline-block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
                📈
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Years of Experience</h3>
              <p className="text-gray-600">Average 15+ years of clinical practice and expertise.</p>
            </div>

            <div className="text-center animate-fade-in-up animation-delay-300">
              <div className="inline-block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
                ⭐
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Top Rated</h3>
              <p className="text-gray-600">Trusted by thousands of satisfied patients worldwide.</p>
            </div>

            <div className="text-center animate-fade-in-up animation-delay-400">
              <div className="inline-block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
                🏥
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Modern Approach</h3>
              <p className="text-gray-600">Latest medical technologies and treatment methods.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="px-4 sm:px-10 lg:px-20 text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Schedule a Consultation?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your appointment now and get expert medical advice from our top specialists.
          </p>
          <Link
            href="/user/appointments/book"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
          >
            Book Appointment Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
