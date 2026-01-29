"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PatientProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/auth/login");
      return;
    }

    const userData = JSON.parse(userStr);
    if (userData?.role !== "doctor") {
      router.push(userData?.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      return;
    }

    if (params.id) {
      fetchPatient(params.id);
    }
  }, [params.id, router]);

  const fetchPatient = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/doctor/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to load patient profile");
        return;
      }

      const data = await res.json();
      setPatient(data);
    } catch (err) {
      console.error("Error fetching patient:", err);
      setError("Failed to load patient profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient profile...</p>
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Patient not found"}</p>
          <Link href="/doctor/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
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
            <p className="text-gray-600 mt-1">Health details for better care</p>
          </div>
          <Link
            href="/doctor/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>←</span>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Info label="Name" value={patient.name} />
              <Info label="Email" value={patient.email} />
              <Info label="Phone" value={patient.phone || "—"} />
              <Info label="Gender" value={patient.gender || "—"} />
              <Info label="Date of Birth" value={patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "—"} />
              <Info label="Blood Group" value={patient.bloodGroup || "—"} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Medical Details</h2>
            <div className="mt-4 space-y-4">
              <ListInfo label="Allergies" items={patient.allergies} emptyText="No allergies provided" icon="⚠️" />
              <ListInfo label="Medical History" items={patient.medicalHistory} emptyText="No medical history provided" icon="🩺" />
              <ListInfo label="Current Medications" items={patient.currentMedications} emptyText="No medications provided" icon="💊" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Emergency Contact</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Info label="Contact Name" value={patient.emergencyContactName || "—"} />
              <Info label="Contact Phone" value={patient.emergencyContactPhone || "—"} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Address</h2>
            <div className="mt-2 text-gray-700">{patient.address || "—"}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );
}

function ListInfo({ label, items, emptyText, icon }) {
  if (!items || items.length === 0) {
    return (
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-700">{emptyText}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {items.map((item, idx) => (
          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            {icon} {item}
          </span>
        ))}
      </div>
    </div>
  );
}
