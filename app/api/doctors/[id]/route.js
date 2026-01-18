import dbConnect from "@/lib/db";
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

// GET all doctors or GET specific doctor
export async function GET(req, { params }) {
  try {
    await dbConnect();

    if (params?.id) {
      // Get specific doctor
      const doctor = await Doctor.findById(params.id);
      if (!doctor) {
        return new Response(
          JSON.stringify({ message: "Doctor not found" }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(doctor), { status: 200 });
    }

    // Get all doctors
    const doctors = await Doctor.find();
    return new Response(JSON.stringify(doctors), { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching doctors" }),
      { status: 500 }
    );
  }
}

// PUT - Update doctor (admin only)
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    // Verify admin
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

    const updateData = await req.json();
    const doctor = await Doctor.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!doctor) {
      return new Response(
        JSON.stringify({ message: "Doctor not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(doctor), { status: 200 });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return new Response(
      JSON.stringify({ message: "Error updating doctor" }),
      { status: 500 }
    );
  }
}

// DELETE - Remove doctor (admin only)
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    // Verify admin
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

    const doctor = await Doctor.findByIdAndDelete(params.id);

    if (!doctor) {
      return new Response(
        JSON.stringify({ message: "Doctor not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Doctor deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting doctor" }),
      { status: 500 }
    );
  }
}
