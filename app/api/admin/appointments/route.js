import dbConnect from "@/lib/db";
import Appointment from "@/models/Appointment";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
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

    const appointments = await Appointment.find()
      .populate("userId")
      .populate("doctorId");

    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching appointments" }),
      { status: 500 }
    );
  }
}
