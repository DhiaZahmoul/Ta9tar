// backend/server/dataBase/dbConnector.js
// Database connection setup
//Connects to MongoDB using Mongoose
//Exits process if connection fails
const mongoose = require("mongoose");

const uri = process.env.dbURI;
if (!uri) {
  throw new Error("❌ Missing dbURI in .env");
}



async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Crash app if DB is not available
  }
}

module.exports = { connectDB };
