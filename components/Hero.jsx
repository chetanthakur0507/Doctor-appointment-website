"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/Doctors?search=${searchTerm}`);
    } else {
      router.push("/Doctors");
    }
  };

  return (
    <section className="px-4 sm:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-10 items-center animate-fade-in">
      <div className="space-y-6 animate-slide-in-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Your Health, <br />
          <span className="text-blue-600 animate-pulse">Our Priority</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-md">
          Find and book the best doctors near you. Search by specialty, name, or clinic and get instant appointments.
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
            placeholder="Search by doctor, specialty..." 
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 font-semibold whitespace-nowrap"
          >
            Find Doctor
          </button>
        </form>

        <div className="flex gap-4 pt-4">
          <Link 
            href="/user/appointments/book"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105 font-semibold"
          >
            Book Appointment
          </Link>
          <Link 
            href="/departments"
            className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition transform hover:scale-105 font-semibold"
          >
            View Departments
          </Link>
        </div>
      </div>

      <div className="relative animate-slide-in-right">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl shadow-2xl overflow-hidden">
          <Image
            src="https://i.pinimg.com/736x/b1/d4/aa/b1d4aa0eed3194fa2003e6c681b507c5.jpg"
            alt="Doctor consultation"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-bounce">
          <p className="text-sm text-gray-600">📅 24/7 Available</p>
          <p className="font-bold text-blue-600">Book Anytime</p>
        </div>
      </div>
    </section>
  );
}
