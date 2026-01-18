import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId, role) {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: "30d",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
