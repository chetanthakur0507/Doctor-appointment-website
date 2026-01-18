import dbConnect from "@/lib/db";

export async function GET(req) {
  try {
    console.log("Testing MongoDB connection...");
    await dbConnect();
    return new Response(
      JSON.stringify({
        success: true,
        message: "✅ MongoDB Connection SUCCESS!",
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: "❌ MongoDB Connection FAILED!",
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
