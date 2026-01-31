"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminUsers() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

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
    fetchUsers(token);
  }, [router]);

  const fetchUsers = async (token) => {
    try {
      const res = await fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load users");
        return;
      }
      setUsers(data || []);
    } catch (err) {
      console.error("Admin users error", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId, role, currentRole) => {
    if (role === currentRole) {
      return;
    }

    let adminPassword = null;
    const isAdminChange = role === "admin" || currentRole === "admin";
    if (isAdminChange) {
      adminPassword = window.prompt("Enter admin role password:");
      if (!adminPassword) {
        return;
      }
    }

    setUpdatingId(userId);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to update role");
        return;
      }
      setUsers((prev) => prev.map((u) => (u._id === userId ? data : u)));
    } catch (err) {
      console.error("Update role error", err);
      setError("Failed to update role");
    } finally {
      setUpdatingId(null);
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
                All Users 👥
              </h1>
              <p className="text-lg text-indigo-100">Manage user accounts and roles</p>
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

          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
              <h2 className="text-2xl font-bold text-gray-900">Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-50 border-b border-indigo-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-indigo-100 hover:bg-indigo-50 transition">
                    <td className="px-6 py-4 font-semibold">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user._id, e.target.value, user.role)}
                        disabled={updatingId === user._id}
                        className="border border-gray-300 rounded-md px-2 py-1 bg-white disabled:bg-gray-100 disabled:text-gray-500"
                      >
                        <option value="user">user</option>
                        <option value="doctor">doctor</option>
                        <option value="admin">admin</option>
                      </select>
                      {user.role === "admin" && (
                        <p className="text-xs text-gray-500 mt-1">Password required to remove admin</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
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
