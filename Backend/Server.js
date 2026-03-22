import express from "express";
import cors from "cors";
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// OTP storage
const otpStore = {};

app.use(cors());
app.use(express.json());

import path from "path";
const FILE = path.resolve("users.json");

// ------------------ EMAIL CONFIG ------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // from .env
    pass: process.env.GMAIL_PASS, // from .env      
  },
});



// ------------------ FILE FUNCTIONS ------------------
const getUsers = () => {
  try {
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, "[]");
    }

    const data = fs.readFileSync(FILE, "utf-8");
    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    console.log("Error reading users:", error);
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
};

// ------------------ SIGNUP ------------------
app.post("/api/auth/signup", (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const users = getUsers();

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { id: Date.now(), fullName, email, password };
    users.push(newUser);

    saveUsers(users);

    res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ LOGIN ------------------
app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: "fake-jwt-token",
    user: {
      fullName: user.fullName,
      email: user.email,
    },
  });
});

// ------------------ SEND OTP (EMAIL) ------------------
app.post("/api/auth/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

  // store OTP
  otpStore[email] = generatedOtp;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `SecondHome- Your OTP is: ${generatedOtp}`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// ------------------ RESET PASSWORD ------------------
app.post("/api/auth/reset-password", (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (otpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const users = getUsers();

  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex].password = newPassword;

  saveUsers(users);

  delete otpStore[email];

  res.json({ message: "Password reset successful" });
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});