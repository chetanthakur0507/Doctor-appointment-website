import dbConnect from "@/lib/db";
import User from "@/models/User";
import { hashPassword, comparePassword, generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password, name } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    // Return success response
    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }),
      { 
        status: 201,
        headers: {
          'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
        }
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({ message: "Error registering user" }),
      { status: 500 }
    );
  }
}
