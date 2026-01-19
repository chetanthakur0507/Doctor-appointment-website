"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === "admin") {
        setAdmin(user);
      } else {
        router.push("/");
      }
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  if (!admin) return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-white">🏥 Admin Panel</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/doctors"
              className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              Doctors
            </Link>
            <Link
              href="/admin/appointments"
              className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              Appointments
            </Link>
            <Link
              href="/admin/users"
              className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              Users
            </Link>
            
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/30">
              <span className="text-white text-sm font-medium">
                👤 {admin.name || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-medium transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/20 p-2 rounded-md z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="text-white px-3 py-2 text-sm font-medium border-b border-white/20 mb-2">
              👤 {admin.name || "Admin"}
            </div>
            <Link
              href="/admin/dashboard"
              className="text-white hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/doctors"
              className="text-white hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Doctors
            </Link>
            <Link
              href="/admin/appointments"
              className="text-white hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Appointments
            </Link>
            <Link
              href="/admin/users"
              className="text-white hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Users
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-white hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
