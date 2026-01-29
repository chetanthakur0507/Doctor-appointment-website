import dbConnect from "@/lib/db";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
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
    if (!decoded || decoded.role !== "doctor") {
      return new Response(JSON.stringify({ message: "Doctor access required" }), {
        status: 403,
      });
    }

    const { status } = await req.json();

    if (!status) {
      return new Response(JSON.stringify({ message: "Status is required" }), {
        status: 400,
      });
    }

    if (!["booked", "completed", "cancelled"].includes(status)) {
      return new Response(JSON.stringify({ message: "Invalid status" }), {
        status: 400,
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

    const appointment = await Appointment.findOne({ _id: params.id, doctorId: doctor._id })
      .populate("userId")
      .populate("doctorId");

    if (!appointment) {
      return new Response(JSON.stringify({ message: "Appointment not found" }), {
        status: 404,
      });
    }

    appointment.status = status;
    if (status === "completed") {
      appointment.completedAt = new Date();
    } else {
      appointment.completedAt = null;
    }

    await appointment.save();

    return new Response(JSON.stringify(appointment), { status: 200 });
  } catch (error) {
    console.error("Error updating doctor appointment:", error);
    return new Response(
      JSON.stringify({ message: "Error updating appointment" }),
      { status: 500 }
    );
  }
}
