"use client";

import { useEffect, useState } from "react";
import DepartmentCard from "@/components/DepartmentCard";
import Link from "next/link";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-4 sm:px-10 lg:px-20 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link> / <span className="text-gray-800">Medical Departments</span>
      </p>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Our Specialties</h1>
          <p className="text-gray-600 mt-2 max-w-xl">
            Explore our comprehensive healthcare services with {departments.length} specialized departments.
          </p>
        </div>

        <Link href="/user/appointments/book" className="border border-red-200 bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-100 transition">
          🚨 Book Emergency Care
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.length > 0 ? (
          departments.map((dept) => (
            <DepartmentCard key={dept.slug} dept={dept} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No departments available
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white rounded-xl mt-16 p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold">
            Can not find what you are looking for?
          </h3>
          <p className="text-blue-100 mt-1">
            Our patient care team is available 24/7 to assist you.
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/Doctors" className="bg-white text-blue-600 px-5 py-2 rounded-md hover:bg-gray-100 transition">
            View All Doctors
          </Link>
          <Link href="/user/appointments/book" className="border border-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Book Appointment
          </Link>
        </div>
      </div>
    </main>
  );
}
