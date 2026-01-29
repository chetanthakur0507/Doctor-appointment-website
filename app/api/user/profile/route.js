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

export async function GET(req) {
  try {
    await dbConnect();

    const token = getToken(req);
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "user") {
      return new Response(JSON.stringify({ message: "User access required" }), { status: 403 });
    }

    const user = await User.findById(decoded.userId).select(
      "name email phone dateOfBirth gender bloodGroup allergies medicalHistory currentMedications emergencyContactName emergencyContactPhone address"
    );

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch profile" }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();

    const token = getToken(req);
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "user") {
      return new Response(JSON.stringify({ message: "User access required" }), { status: 403 });
    }

    const body = await req.json();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    user.dateOfBirth = body.dateOfBirth || null;
    user.gender = body.gender || "";
    user.bloodGroup = body.bloodGroup || "";
    user.allergies = Array.isArray(body.allergies) ? body.allergies : [];
    user.medicalHistory = Array.isArray(body.medicalHistory) ? body.medicalHistory : [];
    user.currentMedications = Array.isArray(body.currentMedications) ? body.currentMedications : [];
    user.emergencyContactName = body.emergencyContactName || "";
    user.emergencyContactPhone = body.emergencyContactPhone || "";
    user.address = body.address || "";

    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return new Response(JSON.stringify({ message: "Failed to update profile" }), { status: 500 });
  }
}
