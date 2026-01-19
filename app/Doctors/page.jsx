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
  const [departments, setDepartments] = useState(["All"]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Check URL params for department filter
    const deptParam = searchParams.get('dept');
    const searchParam = searchParams.get('search');
    
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

  const filteredDoctors = selectedDepartment === "All" 
    ? doctors 
    : doctors.filter(doc => doc.department === selectedDepartment);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading doctors...</div>
      </div>
    );
  }

  return (
    <div>
      <main className="min-h-screen bg-gray-50 px-4 sm:px-10 lg:px-20 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Doctors</h1>
          <p className="text-gray-600">Find the best healthcare professionals for your needs</p>
        </div>

        {/* Department Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-full transition ${
                selectedDepartment === dept
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-300"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-600">
                    {doctor.name?.charAt(0) || "D"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>
                  <p className="text-gray-600 text-sm mb-1">Experience: {doctor.experience} years</p>
                  <p className="text-gray-600 text-sm mb-4">Fee: ₹{doctor.fees}</p>
                  <div className="flex gap-2">
                    <Link 
                      href={`/Doctors/${doctor._id}`} 
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      View Profile
                    </Link>
                    <Link 
                      href="/user/appointments/book" 
                      className="flex-1 text-center bg-white text-blue-600 border border-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No doctors found in this department
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding the Right Doctor?</h2>
          <p className="mb-6">Our support team is here to assist you</p>
          <Link href="/auth/register" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Register Now
          </Link>
        </div>
      </main>
    </div>
  );
}
