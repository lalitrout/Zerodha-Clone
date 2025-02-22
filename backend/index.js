require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PositionModel } = require("./models/PositionModel");
const { HoldingModel } = require("./models/HoldingModel");
const { OrderModel } = require("./models/OrderModel");

const PORT = process.env.PORT || 3002;
const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/myLocalDB";

const app = express();

// Middleware
app.use(cors());
app.use(cors({ origin: "https://frontend-f4bkx7xom-lalit-routs-projects.vercel.app", credentials: true }));
app.use(cookieParser());
app.use(express.json()); // ✅ Required to parse JSON request bodies

// MongoDB connection
async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}
main();

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String,unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Secret Token Function
const createSecretToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "yourSecretKey", { expiresIn: "1h" });
};

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, username });

    await user.save();

    // Auto-login user after signup
    const token = createSecretToken(user._id);
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });

    res.status(201).json({ message: "Signup successful", success: true, user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password", success: false });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password", success: false });
    }

    // Generate JWT Token
    const token = createSecretToken(user._id);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // Secure cookie in production
      sameSite: "strict",
    });

    res.status(200).json({ message: "User logged in successfully", success: true, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});


// Get all positions
app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching positions" });
  }
});

// Get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

// Get all orders
app.get("/allOrders", async (req, res) => {
  try {
    let allOrders = await OrderModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Add a new order and update holdings
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let newOrder = new OrderModel({ name, qty, price, mode });
    await newOrder.save(); // ✅ Ensure the order is saved before responding

    res.status(201).json({ message: "Order saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving order" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 App started on port ${PORT}`);
});