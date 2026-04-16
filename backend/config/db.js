const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to your environment variables.");
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("MongoDB connected");
};

module.exports = connectDB;
