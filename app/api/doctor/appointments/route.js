import dbConnect from "@/lib/db";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

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
    if (!decoded || decoded.role !== "doctor") {
      return new Response(JSON.stringify({ message: "Doctor access required" }), {
        status: 403,
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const doctor = await Doctor.findOne({ email: user.email });
    if (!doctor) {
      return new Response(JSON.stringify({ message: "Doctor profile not found" }), {
        status: 404,
      });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate("userId")
      .populate("doctorId")
      .sort({ date: 1, time: 1 });

    return new Response(JSON.stringify({ doctor, appointments }), { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching appointments" }),
      { status: 500 }
    );
  }
}
