import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("Missing MONGODB_URL environment variable");
  }

  // Use mongoose's actual readyState instead of a stale boolean flag.
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // If a connection is already being established, wait for it
  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve) => mongoose.connection.once("connected", resolve));
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
      // Recommended settings for serverless environments
      bufferCommands: false,  // Disable buffering — fail fast instead of timing out
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,  // Fail after 5s if can't select server
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    throw error;
  }
};
