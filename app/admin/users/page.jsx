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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600">All registered users</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>←</span>
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200">
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
  );
}
