"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    allergies: [],
    medicalHistory: [],
    currentMedications: [],
    emergencyContactName: "",
    emergencyContactPhone: "",
    address: "",
  });

  const [allergyInput, setAllergyInput] = useState("");
  const [historyInput, setHistoryInput] = useState("");
  const [medicationInput, setMedicationInput] = useState("");

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

    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setError("Failed to load profile");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setFormData({
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : "",
        gender: data.gender || "",
        bloodGroup: data.bloodGroup || "",
        allergies: data.allergies || [],
        medicalHistory: data.medicalHistory || [],
        currentMedications: data.currentMedications || [],
        emergencyContactName: data.emergencyContactName || "",
        emergencyContactPhone: data.emergencyContactPhone || "",
        address: data.address || "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = (key, value, setValue) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], value.trim()],
    }));
    setValue("");
  };

  const handleRemoveItem = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to update profile");
        return;
      }

      const updated = await res.json();
      setFormData({
        dateOfBirth: updated.dateOfBirth ? updated.dateOfBirth.substring(0, 10) : "",
        gender: updated.gender || "",
        bloodGroup: updated.bloodGroup || "",
        allergies: updated.allergies || [],
        medicalHistory: updated.medicalHistory || [],
        currentMedications: updated.currentMedications || [],
        emergencyContactName: updated.emergencyContactName || "",
        emergencyContactPhone: updated.emergencyContactPhone || "",
        address: updated.address || "",
      });
      localStorage.setItem("userProfile", JSON.stringify(updated));
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-4 sm:px-10 lg:px-20 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Profile</h1>
            <p className="text-gray-600 mt-1">Keep your health details updated for doctors</p>
          </div>
          <Link
            href="/user/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>←</span>
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border shadow-sm p-8 space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">Basic Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  placeholder="e.g., O+"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">Medical Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  placeholder="e.g., Peanuts"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddItem("allergies", allergyInput, setAllergyInput))}
                />
                <button
                  type="button"
                  onClick={() => handleAddItem("allergies", allergyInput, setAllergyInput)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.allergies.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-800">⚠️ {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("allergies", idx)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={historyInput}
                  onChange={(e) => setHistoryInput(e.target.value)}
                  placeholder="e.g., Diabetes"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddItem("medicalHistory", historyInput, setHistoryInput))}
                />
                <button
                  type="button"
                  onClick={() => handleAddItem("medicalHistory", historyInput, setHistoryInput)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.medicalHistory.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-800">🩺 {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("medicalHistory", idx)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={medicationInput}
                  onChange={(e) => setMedicationInput(e.target.value)}
                  placeholder="e.g., Metformin"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddItem("currentMedications", medicationInput, setMedicationInput))}
                />
                <button
                  type="button"
                  onClick={() => handleAddItem("currentMedications", medicationInput, setMedicationInput)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.currentMedications.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-800">💊 {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("currentMedications", idx)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="text"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                  placeholder="e.g., +91 98765 43210"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">Address</h2>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/user/dashboard"
              className="px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
