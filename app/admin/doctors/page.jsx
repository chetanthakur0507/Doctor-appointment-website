"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDoctors() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    specialization: "",
    fees: "",
    experience: "",
    image: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (!token || !userStr) {
      router.push("/admin/login");
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== "admin") {
      router.push("/admin/login");
      return;
    }
    fetchDoctors();
  }, [router]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setDoctors(data || []);
    } catch (err) {
      console.error("Fetch doctors error", err);
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          fees: Number(form.fees),
          experience: Number(form.experience),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to create doctor");
        return;
      }
      setDoctors((prev) => [data, ...prev]);
      setForm({
        name: "",
        email: "",
        phone: "",
        department: "",
        specialization: "",
        fees: "",
        experience: "",
        image: "",
      });
    } catch (err) {
      console.error("Create doctor error", err);
      setError("Failed to create doctor");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this doctor?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setDoctors((prev) => prev.filter((d) => d._id !== id));
      }
    } catch (err) {
      console.error("Delete doctor error", err);
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
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="animate-fade-in-up flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                Manage Doctors 👨‍⚕️
              </h1>
              <p className="text-lg text-indigo-100">Add, edit, and remove doctors from the platform</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>←</span>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Doctor</h2>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border border-gray-300 rounded-md px-3 py-2" />
            <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="border border-gray-300 rounded-md px-3 py-2" />
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" className="border border-gray-300 rounded-md px-3 py-2" />
            <input name="department" value={form.department} onChange={handleChange} required placeholder="Department" className="border border-gray-300 rounded-md px-3 py-2" />
            <input name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" className="border border-gray-300 rounded-md px-3 py-2" />
            <input name="fees" value={form.fees} onChange={handleChange} required placeholder="Fees" className="border border-gray-300 rounded-md px-3 py-2" />
            <input name="experience" value={form.experience} onChange={handleChange} required placeholder="Experience (years)" className="border border-gray-300 rounded-md px-3 py-2" />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border border-gray-300 rounded-md px-3 py-2" />
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {submitting ? "Saving..." : "Add Doctor"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Doctors</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fees</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Experience</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id} className="border-b border-gray-200">
                    <td className="px-6 py-4 font-semibold">{doctor.name}</td>
                    <td className="px-6 py-4">{doctor.department}</td>
                    <td className="px-6 py-4">₹{doctor.fees}</td>
                    <td className="px-6 py-4">{doctor.experience} yrs</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
