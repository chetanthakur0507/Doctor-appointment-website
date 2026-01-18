import dbConnect from "@/lib/db";
import User from "@/models/User";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Please provide email and password" }),
        { status: 400 }
      );
    }

    // Find user and select password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }),
      { 
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
        }
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ message: "Error logging in" }),
      { status: 500 }
    );
  }
}
