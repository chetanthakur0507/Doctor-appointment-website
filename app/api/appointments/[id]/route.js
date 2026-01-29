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

export async function PUT(req, { params }) {
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

    const { status } = await req.json();

    const appointment = await Appointment.findOneAndUpdate(
      { _id: params.id, userId: decoded.userId },
      { status },
      { new: true }
    ).populate("doctorId");

    if (!appointment) {
      return new Response(
        JSON.stringify({ message: "Appointment not found" }),
        { status: 404 }
      );
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

export async function DELETE(req, { params }) {
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

    const appointment = await Appointment.findOneAndDelete({ _id: params.id, userId: decoded.userId });

    if (!appointment) {
      return new Response(
        JSON.stringify({ message: "Appointment not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Appointment cancelled" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return new Response(
      JSON.stringify({ message: "Error cancelling appointment" }),
      { status: 500 }
    );
  }
}
