"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/auth/login");
      return;
    }

    const userData = JSON.parse(userStr);
    if (userData?.role !== "user") {
      router.push(userData?.role === "admin" ? "/admin/dashboard" : "/doctor/dashboard");
      return;
    }
    setUser(userData);
    fetchAppointments(token);
    fetchProfile(token);
  }, [router]);

  const fetchProfile = async (token) => {
    try {
      setProfileError("");
      const res = await fetch("/api/user/profile", {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store",
        credentials: "include",
      });
      if (!res.ok) {
        const cached = localStorage.getItem("userProfile");
        if (cached) {
          setProfile(JSON.parse(cached));
        }
        setProfileError("Profile not loaded. Please refresh.");
        return;
      }
      const data = await res.json();
      setProfile(data);
      localStorage.setItem("userProfile", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching profile:", error);
      const cached = localStorage.getItem("userProfile");
      if (cached) {
        setProfile(JSON.parse(cached));
      }
      setProfileError("Profile not loaded. Please refresh.");
    }
  };

  const fetchAppointments = async (token) => {
    try {
      const res = await fetch("/api/appointments", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // Ensure data is an array and sort by creation date (newest first)
      if (Array.isArray(data)) {
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAppointments(sortedData);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setAppointments(
          appointments.filter((apt) => apt._id !== appointmentId)
        );
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const upcomingCount = appointments.filter((apt) => apt.status === "booked").length;
  const completedCount = appointments.filter((apt) => apt.status === "completed").length;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-up flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                Welcome, {user?.name}! 👋
              </h1>
              <p className="text-lg text-blue-100">Manage your medical appointments and health records</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/user/profile"
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>🧾</span>
                Edit Profile
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>🏠</span>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="px-4 sm:px-10 lg:px-20 mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">👤 Patient Profile</h2>
              <p className="text-gray-600 text-sm">
                {profile ? "✓ Your medical profile is complete and shared with your doctor for better care." : "⚠️ Complete your profile to help doctors treat you better."}
              </p>
              {profileError && (
                <p className="text-sm text-red-600 mt-2 bg-red-50 p-2 rounded">🚨 {profileError}</p>
              )}
              {profile && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 font-semibold">Date of Birth</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "—"}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 font-semibold">Gender</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">{profile.gender || "—"}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 font-semibold">Blood Group</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">{profile.bloodGroup || "—"}</p>
                  </div>
                  {profile.allergies?.length > 0 && (
                    <div className="bg-orange-50 p-3 rounded-lg col-span-2 sm:col-span-1">
                      <p className="text-xs text-gray-600 font-semibold">Allergies</p>
                      <p className="text-xs font-bold text-gray-900 mt-1">{profile.allergies.join(", ")}</p>
                    </div>
                  )}
                  {profile.medicalHistory?.length > 0 && (
                    <div className="bg-yellow-50 p-3 rounded-lg col-span-2 sm:col-span-1">
                      <p className="text-xs text-gray-600 font-semibold">Medical History</p>
                      <p className="text-xs font-bold text-gray-900 mt-1">{profile.medicalHistory.join(", ")}</p>
                    </div>
                  )}
                  {profile.currentMedications?.length > 0 && (
                    <div className="bg-red-50 p-3 rounded-lg col-span-2 sm:col-span-1">
                      <p className="text-xs text-gray-600 font-semibold">Current Medications</p>
                      <p className="text-xs font-bold text-gray-900 mt-1">{profile.currentMedications.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
           
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="animate-fade-in-up animation-delay-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Total Appointments */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fade-in-up">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-24 flex items-center justify-center text-5xl">
                📋
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Appointments</p>
                <p className="text-4xl font-bold text-blue-600">{appointments.length}</p>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fade-in-up animation-delay-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-24 flex items-center justify-center text-5xl">
                ✅
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Upcoming Appointments</p>
                <p className="text-4xl font-bold text-green-600">{upcomingCount}</p>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fade-in-up animation-delay-200">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-24 flex items-center justify-center text-5xl">
                🎉
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Completed</p>
                <p className="text-4xl font-bold text-purple-600">{completedCount}</p>
              </div>
            </div>
          </div>

          {/* Book New Appointment Button */}
          <div className="mb-12 animate-slide-in-right">
            <Link
              href="/user/appointments/book"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 transform hover:scale-105 transition-all shadow-lg"
            >
              + Book New Appointment
            </Link>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="animate-fade-in-up animation-delay-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="space-y-6">
              {appointments.map((appointment, index) => {
                const deptColor = getColorForDept(appointment.doctorId?.department || "");
                const statusColor = 
                  appointment.status === "booked" ? "from-green-500 to-emerald-500" :
                  appointment.status === "completed" ? "from-blue-500 to-cyan-500" :
                  "from-red-500 to-pink-500";

                return (
                  <div
                    key={appointment._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Left Gradient Bar */}
                      <div className={`bg-gradient-to-r ${deptColor.color} w-full md:w-2 flex-shrink-0`}></div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          {/* Doctor & Date Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              Dr. {appointment.doctorId?.name || "Unknown"}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 mb-1">📅 Date</p>
                                <p className="font-semibold text-gray-800">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">⏰ Time</p>
                                <p className="font-semibold text-gray-800">{appointment.time}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">🏥 Department</p>
                                <p className="font-semibold text-gray-800">{appointment.doctorId?.department || "N/A"}</p>
                              </div>
                            </div>
                            {appointment.status === "completed" && appointment.completedAt && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-gray-600 mb-1">✅ Completed on</p>
                                <p className="font-semibold text-green-600">
                                  {new Date(appointment.completedAt).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(appointment.completedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Status & Actions */}
                          <div className="md:text-right">
                            <div className="mb-4">
                              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${
                                appointment.status === "booked" ? "from-green-500 to-emerald-500" :
                                appointment.status === "completed" ? "from-blue-500 to-cyan-500" :
                                "from-red-500 to-pink-500"
                              }`}>
                                {appointment.status === "booked" ? "✓ Upcoming" : appointment.status === "completed" ? "✓ Completed" : "✗ Cancelled"}
                              </span>
                            </div>
                            {appointment.status === "booked" && (
                              <button
                                onClick={() => cancelAppointment(appointment._id)}
                                className="text-red-600 hover:text-red-800 font-semibold text-sm hover:bg-red-50 px-4 py-2 rounded-lg transition"
                              >
                                Cancel Appointment
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-md">
              <p className="text-6xl mb-4">📭</p>
              <p className="text-gray-600 text-lg mb-6">
                You have not booked any appointments yet.
              </p>
              <Link
                href="/user/appointments/book"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                Book Your First Appointment
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 mt-20">
        <div className="px-4 sm:px-10 lg:px-20 text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Need More Help?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            View our doctors, departments, or medical blogs for more health information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/Doctors"
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              View Doctors
            </Link>
            <Link
              href="/blogs"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              Read Medical Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
