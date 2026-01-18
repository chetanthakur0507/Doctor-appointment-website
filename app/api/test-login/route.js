import dbConnect from "@/lib/db";
import User from "@/models/User";
import { comparePassword } from "@/lib/auth";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    console.log("Login attempt for:", email);

    // Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("User not found");
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    console.log("User found:", user.email);

    // Compare password
    const isPasswordCorrect = await comparePassword(password, user.password);
    console.log("Password correct:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Login successful (test mode - no token)",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login test error:", error);
    return new Response(
      JSON.stringify({ message: "Error: " + error.message }),
      { status: 500 }
    );
  }
}
