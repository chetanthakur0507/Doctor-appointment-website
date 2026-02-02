import dbConnect from "@/lib/db";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

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

function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(req, { params }) {
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

    const appointment = await Appointment.findOne({
      _id: params.id,
      doctorId: doctor._id,
    })
      .populate("userId")
      .populate("doctorId");

    if (!appointment) {
      return new Response(JSON.stringify({ message: "Appointment not found" }), {
        status: 404,
      });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return new Response(JSON.stringify({ message: "File is required" }), {
        status: 400,
      });
    }

    const safeName = sanitizeFileName(file.name || "prescription.pdf");
    const timestamp = Date.now();
    const fileName = `${timestamp}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public", "prescriptions", params.id);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    appointment.prescription = {
      url: `/prescriptions/${params.id}/${fileName}`,
      name: safeName,
      uploadedAt: new Date(),
      uploadedBy: "doctor",
    };

    await appointment.save();

    return new Response(JSON.stringify(appointment), { status: 200 });
  } catch (error) {
    console.error("Error uploading prescription:", error);
    return new Response(
      JSON.stringify({ message: "Error uploading prescription" }),
      { status: 500 }
    );
  }
}
