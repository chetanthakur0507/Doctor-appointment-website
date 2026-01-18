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

export async function GET(req) {
  try {
    await dbConnect();

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

// POST - Add new doctor (admin only)
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
    if (!decoded || decoded.role !== "admin") {
      return new Response(JSON.stringify({ message: "Admin access required" }), {
        status: 403,
      });
    }

    const doctorData = await req.json();
    const doctor = await Doctor.create(doctorData);
    return new Response(JSON.stringify(doctor), { status: 201 });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return new Response(
      JSON.stringify({ message: "Error creating doctor" }),
      { status: 500 }
    );
  }
}
