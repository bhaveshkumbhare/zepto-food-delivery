import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import dbConnect from './config/dbConnect.js';
import bcrypt from "bcryptjs";
import User from './models/userModels.js';

const app = express();


app.use(express.json());
app.use(cors(
    {
        origin : "http://localhost:4028",
        credentials : true
    }
));

// DB Connect
dbConnect();

app.post('/user-account-details', async(req, res)=>{
    try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    // 1️⃣ Manual check for required fields
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email or phone already exists" });
    }

    // 3️⃣ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // 4️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5️⃣ Create user
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      confirmPassword: hashedPassword, // store hashed as well
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // 2️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 4️⃣ Success response
    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      fullName: user.fullName,
      email: user.email
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password -confirmPassword"); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(4000, ()=>{
    console.log('Server running on PORT : ', 4000)
})