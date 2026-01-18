import dbConnect from "@/lib/db";
import Doctor from "@/models/Doctor";

export async function POST(req) {
  try {
    await dbConnect();

    const sampleDoctors = [
      {
        name: "Dr. Rajesh Kumar",
        email: "rajesh@hospital.com",
        phone: "9876543210",
        department: "Cardiology",
        specialization: "Heart Specialist",
        fees: 1000,
        experience: 15,
        image: "/img/doctor-1.jpg",
        bio: "Expert in cardiac care with 15 years experience",
      },
      {
        name: "Dr. Priya Sharma",
        email: "priya@hospital.com",
        phone: "9876543211",
        department: "Pediatrics",
        specialization: "Child Specialist",
        fees: 800,
        experience: 10,
        image: "/img/doctor-2.jpg",
        bio: "Specialized in child health and development",
      },
      {
        name: "Dr. Amit Patel",
        email: "amit@hospital.com",
        phone: "9876543212",
        department: "Orthopedics",
        specialization: "Bone & Joint Specialist",
        fees: 1200,
        experience: 12,
        image: "/img/doctor-3.jpg",
        bio: "Expert in bone and joint treatments",
      },
      {
        name: "Dr. Sneha Reddy",
        email: "sneha@hospital.com",
        phone: "9876543213",
        department: "Dermatology",
        specialization: "Skin Specialist",
        fees: 700,
        experience: 8,
        image: "/img/doctor-4.jpg",
        bio: "Specialized in skin and hair care",
      },
      {
        name: "Dr. Arjun Singh",
        email: "arjun@hospital.com",
        phone: "9876543214",
        department: "Neurology",
        specialization: "Brain & Nerve Specialist",
        fees: 1500,
        experience: 18,
        image: "/img/doctor-5.jpg",
        bio: "Expert neurologist with extensive experience",
      },
    ];

    // Check if doctors already exist
    const existingCount = await Doctor.countDocuments();
    
    if (existingCount > 0) {
      return new Response(
        JSON.stringify({
          message: `Already ${existingCount} doctors exist in database`,
          doctors: await Doctor.find(),
        }),
        { status: 200 }
      );
    }

    // Add sample doctors
    const doctors = await Doctor.insertMany(sampleDoctors);

    return new Response(
      JSON.stringify({
        success: true,
        message: `${doctors.length} doctors added successfully!`,
        doctors: doctors,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed doctors error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error adding doctors",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
