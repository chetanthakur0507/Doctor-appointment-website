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

    if (decoded.role !== "user") {
      return new Response(JSON.stringify({ message: "User access required" }), {
        status: 403,
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

// POST - Book appointment or check duplicates
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

    if (decoded.role !== "user") {
      return new Response(JSON.stringify({ message: "User access required" }), {
        status: 403,
      });
    }

    const url = new URL(req.url);
    const isCheckDuplicate = url.searchParams.get("checkDuplicate") === "true";

    const { doctorId, date, time, notes, paymentId, paymentStatus } = await req.json();

    // Check for duplicate booking (same doctor, date, time)
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      time,
      status: { $in: ["booked", "confirmed", "completed"] },
    });

    if (isCheckDuplicate) {
      return new Response(
        JSON.stringify({
          isDuplicate: !!existingAppointment,
          message: existingAppointment ? "Slot already booked" : "Slot available",
        }),
        { status: 200 }
      );
    }

    if (existingAppointment) {
      return new Response(
        JSON.stringify({
          message: "❌ This time slot with this doctor is already booked. Please choose another time.",
        }),
        { status: 400 }
      );
    }

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
      paymentId: paymentId || null,
      paymentStatus: paymentStatus || "pending",
      sessionNumber: previousAppointments + 1,
      status: "booked",
    });

    const populatedAppointment = await appointment.populate("doctorId");

    return new Response(JSON.stringify(populatedAppointment), { status: 201 });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return new Response(
      JSON.stringify({ message: "Error booking appointment", error: error.message }),
      { status: 500 }
    );
  }
}
