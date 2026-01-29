"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    specialization: "",
    biography: "",
    education: [],
    certifications: [],
    languages: [],
    clinicAddress: "",
    fees: "",
    experience: "",
  });
  const [educationInput, setEducationInput] = useState("");
  const [certificationInput, setCertificationInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.role !== "doctor") {
      router.push("/user/dashboard");
      return;
    }

    fetchDoctorProfile();
  }, [router]);

  const fetchDoctorProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/doctor/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setError("Failed to load profile");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setFormData({
        specialization: data.specialization || "",
        biography: data.biography || "",
        education: data.education || [],
        certifications: data.certifications || [],
        languages: data.languages || [],
        clinicAddress: data.clinicAddress || "",
        fees: data.fees || "",
        experience: data.experience || "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEducation = () => {
    if (educationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, educationInput.trim()],
      }));
      setEducationInput("");
    }
  };

  const handleRemoveEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleAddCertification = () => {
    if (certificationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, certificationInput.trim()],
      }));
      setCertificationInput("");
    }
  };

  const handleRemoveCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, languageInput.trim()],
      }));
      setLanguageInput("");
    }
  };

  const handleRemoveLanguage = (index) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/doctor/profile", {
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

      setMessage("Profile updated successfully!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-600 mt-1">Update your professional information</p>
          </div>
          <Link
            href="/doctor/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>←</span>
            Back to Dashboard
          </Link>
        </div>

        {/* Messages */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border shadow-sm p-8 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="e.g., Cardiologist"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Fee (₹)
                </label>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">
              Professional Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biography
              </label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                placeholder="Write a brief biography about yourself and your expertise..."
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Address
              </label>
              <textarea
                name="clinicAddress"
                value={formData.clinicAddress}
                onChange={handleInputChange}
                placeholder="Enter your clinic address..."
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">
              Education & Certifications
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={educationInput}
                  onChange={(e) => setEducationInput(e.target.value)}
                  placeholder="e.g., Harvard Medical School (MD)"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddEducation())}
                />
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.education.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-800">🎓 {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(idx)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={certificationInput}
                  onChange={(e) => setCertificationInput(e.target.value)}
                  placeholder="e.g., Johns Hopkins University – Residency"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCertification())}
                />
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.certifications.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-800">🏥 {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(idx)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  placeholder="e.g., English, Hindi, Spanish"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLanguage())}
                />
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.languages.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-800">🗣️ {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(idx)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/doctor/dashboard"
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
