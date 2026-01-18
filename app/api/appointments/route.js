import dbConnect from "@/lib/db";
import Appointment from "@/models/Appointment";
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

// GET all appointments for user
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
    if (!decoded) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });
    }

    const appointments = await Appointment.find({ userId: decoded.userId })
      .populate("doctorId")
      .populate("userId");

    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching appointments" }),
      { status: 500 }
    );
  }
}

// POST - Book appointment
export async function POST(req) {
  try {
    await dbConnect();

    const token = getToken(req);

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });
    }

    const { doctorId, date, time, notes } = await req.json();

    // Count previous sessions with same doctor
    const previousAppointments = await Appointment.countDocuments({
      userId: decoded.userId,
      doctorId: doctorId,
      status: "completed",
    });

    const appointment = await Appointment.create({
      userId: decoded.userId,
      doctorId,
      date: new Date(date),
      time,
      notes,
      sessionNumber: previousAppointments + 1,
      status: "booked",
    });

    const populatedAppointment = await appointment.populate("doctorId");

    return new Response(JSON.stringify(populatedAppointment), { status: 201 });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return new Response(
      JSON.stringify({ message: "Error booking appointment" }),
      { status: 500 }
    );
  }
}
