import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  try {
    await dbConnect();
    const users = await User.find().select("-password"); // password hide karke
    
    return new Response(
      JSON.stringify({
        success: true,
        count: users.length,
        users: users,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
