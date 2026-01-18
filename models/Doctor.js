import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide doctor name"],
    },
    email: {
      type: String,
      required: [true, "Please provide doctor email"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide phone number"],
    },
    department: {
      type: String,
      required: [true, "Please provide department"],
    },
    specialization: {
      type: String,
    },
    fees: {
      type: Number,
      required: [true, "Please provide consultation fees"],
    },
    experience: {
      type: Number,
      required: [true, "Please provide years of experience"],
    },
    image: {
      type: String,
      default: "/img/default-doctor.jpg",
    },
    bio: {
      type: String,
    },
    availability: {
      type: [String],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
