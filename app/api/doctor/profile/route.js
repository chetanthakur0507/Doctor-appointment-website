import dbConnect from "@/lib/db";
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

    return new Response(JSON.stringify(doctor), { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch profile" }),
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
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

    const body = await req.json();

    const doctor = await Doctor.findOne({ email: user.email });
    if (!doctor) {
      return new Response(JSON.stringify({ message: "Doctor profile not found" }), {
        status: 404,
      });
    }

    // Update profile fields (allow empty values)
    if (Object.prototype.hasOwnProperty.call(body, "specialization")) {
      doctor.specialization = body.specialization || "";
    }
    if (Object.prototype.hasOwnProperty.call(body, "biography")) {
      doctor.biography = body.biography || "";
    }
    if (Object.prototype.hasOwnProperty.call(body, "education")) {
      doctor.education = Array.isArray(body.education) ? body.education : [];
    }
    if (Object.prototype.hasOwnProperty.call(body, "certifications")) {
      doctor.certifications = Array.isArray(body.certifications) ? body.certifications : [];
    }
    if (Object.prototype.hasOwnProperty.call(body, "languages")) {
      doctor.languages = Array.isArray(body.languages) ? body.languages : [];
    }
    if (Object.prototype.hasOwnProperty.call(body, "clinicAddress")) {
      doctor.clinicAddress = body.clinicAddress || "";
    }
    if (Object.prototype.hasOwnProperty.call(body, "fees")) {
      doctor.fees = body.fees === "" ? doctor.fees : Number(body.fees);
    }
    if (Object.prototype.hasOwnProperty.call(body, "experience")) {
      doctor.experience = body.experience === "" ? doctor.experience : Number(body.experience);
    }

    await doctor.save();

    return new Response(JSON.stringify(doctor), { status: 200 });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update profile" }),
      { status: 500 }
    );
  }
}
