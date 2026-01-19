"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/auth/login");
      return;
    }

    const userData = JSON.parse(userStr);
    setUser(userData);
    fetchAppointments(token);
  }, [router]);

  const fetchAppointments = async (token) => {
    try {
      const res = await fetch("/api/appointments", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-600">Manage your appointments</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold">
              Total Appointments
            </h3>
            <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold">
              Upcoming Appointments
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {appointments.filter((apt) => apt.status === "booked").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold">
              Completed
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {appointments.filter((apt) => apt.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Book New Appointment */}
        <Link
          href="/user/appointments/book"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mb-8 font-semibold"
        >
          + Book New Appointment
        </Link>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Appointments
            </h2>
          </div>

          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Session
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="border-b border-gray-200">
                      <td className="px-6 py-4">
                        {appointment.doctorId?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(appointment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{appointment.time}</td>
                      <td className="px-6 py-4">#{appointment.sessionNumber}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            appointment.status === "booked"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {appointment.status === "booked" && (
                          <button
                            onClick={() => cancelAppointment(appointment._id)}
                            className="text-red-600 hover:text-red-800 text-sm font-semibold"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-600 mb-4">
                You haven&apos;t booked any appointments yet.
              </p>
              <Link
                href="/user/appointments/book"
                className="text-blue-600 font-semibold hover:underline"
              >
                Book your first appointment
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
