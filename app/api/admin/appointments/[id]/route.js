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

    const { id } = params;
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

    const updateData = { status };
    
    // If marking as completed, set completedAt to current time
    if (status === "completed") {
      updateData.completedAt = new Date();
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate("userId")
      .populate("doctorId");

    if (!appointment) {
      return new Response(JSON.stringify({ message: "Appointment not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(appointment), { status: 200 });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return new Response(
      JSON.stringify({ message: "Error updating appointment" }),
      { status: 500 }
    );
  }
}
