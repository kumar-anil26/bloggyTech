const mongoose = require("mongoose");

// We create a variable outside the function to "cache" the connection
let isConnected = false;

const connectDB = async () => {
  // If we are already connected, don't start a new connection
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      // These options help prevent common connection drops on Vercel
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState;
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.log("Connection to MongoDB failed:", err.message);
    // On Vercel, if DB fails, we want to know why immediately
    throw new Error("Database connection failed");
  }
};

module.exports = connectDB;
