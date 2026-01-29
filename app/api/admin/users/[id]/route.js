import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

function getToken(req) {
  const cookieStore = cookies();
  const cookieToken = cookieStore.get("token")?.value;
  const authHeader = req.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;
  return cookieToken || bearerToken || null;
}

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const token = getToken(req);

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return new Response(JSON.stringify({ message: "Admin access required" }), {
        status: 403,
      });
    }

    const { role, adminPassword } = await req.json();

    if (!role) {
      return new Response(JSON.stringify({ message: "Role is required" }), {
        status: 400,
      });
    }

    if (!["user", "admin", "doctor"].includes(role)) {
      return new Response(JSON.stringify({ message: "Invalid role" }), {
        status: 400,
      });
    }

    const user = await User.findById(params.id);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const isAdminChange = user.role === "admin" || role === "admin";

    if (isAdminChange && user.role !== role) {
      const adminSecret = process.env.ADMIN_ROLE_PASSWORD;
      if (!adminSecret) {
        return new Response(
          JSON.stringify({ message: "Admin role password not configured" }),
          { status: 500 }
        );
      }
      if (!adminPassword || adminPassword !== adminSecret) {
        return new Response(
          JSON.stringify({ message: "Invalid admin password" }),
          { status: 403 }
        );
      }
    }

    user.role = role;
    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    return new Response(
      JSON.stringify({ message: "Error updating user role" }),
      { status: 500 }
    );
  }
}
