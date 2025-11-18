import mongoose from "mongoose";
export async function connectDB(mongoUri) {
  if (!mongoUri) throw new Error("MONGO_URI is not provided");
  try {
    await mongoose.connect(mongoUri, {
      dbName: "triochat_demo",
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
