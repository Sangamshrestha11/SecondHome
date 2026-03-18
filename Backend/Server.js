import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

import path from "path";
const FILE = path.resolve("users.json"); 

// Read users
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

// Save users
const saveUsers = (users) => {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
};

/* SIGNUP */
app.post("/api/auth/signup", (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log("Signup request:", req.body);

    const users = getUsers();
    console.log("Existing users:", users);

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { id: Date.now(), fullName, email, password };
    users.push(newUser);

    saveUsers(users);
    console.log("User saved successfully");

    res.json({ message: "Signup successful" });
  } catch (error) {
  console.error("Signup error FULL:", error);
  res.status(500).json({ message: "Server error", error: error.message });
}
});

/* LOGIN */
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});