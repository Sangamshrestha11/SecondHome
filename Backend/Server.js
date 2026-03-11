import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const FILE = "./users.json";

// Read users
const getUsers = () => {
  const data = fs.readFileSync(FILE);
  return JSON.parse(data);
};

// Save users
const saveUsers = (users) => {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
};

/* SIGNUP */
app.post("/api/auth/signup", (req, res) => {
  const { fullName, email, password } = req.body;

  const users = getUsers();

  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    fullName,
    email,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  res.json({ message: "Signup successful" });
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