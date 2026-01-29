"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DoctorProfileCard from "@/components/DoctorProfileCard";
import AppointmentCard from "@/components/AppointmentCard";
import SectionTabs from "@/components/SectionTabs";
import Link from "next/link";

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.slugs) {
      fetchDoctor(params.slugs);
    }
  }, [params.slugs]);

  const fetchDoctor = async (id) => {
    try {
      const res = await fetch(`/api/doctors/${id}`, { cache: "no-store" });
      if (!res.ok) {
        setError("Doctor not found");
        return;
      }
      const data = await res.json();
      setDoctor(data);
    } catch (err) {
      console.error("Error fetching doctor:", err);
      setError("Failed to load doctor details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Doctor not found"}</p>
          <Link href="/Doctors" className="text-blue-600 hover:underline">
            ← Back to Doctors List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-4 sm:px-10 lg:px-20 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link> / 
        <Link href="/Doctors" className="hover:text-blue-600"> Doctors</Link> / 
        <span className="text-gray-800"> {doctor.name}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          <DoctorProfileCard doctor={doctor} />
          <SectionTabs doctor={doctor} />
        </div>

        {/* Right Appointment Card */}
        <AppointmentCard doctor={doctor} />
      </div>
    </main>
  );
}
