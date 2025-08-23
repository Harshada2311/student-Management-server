const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "K93v@x72!Zq6#MbP1Rt$X8Fg^vNdEoWq"

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  //console.log("Request Body:", req.body);
 if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hash });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  }catch (err) {
    console.error("Register Error:", err);  
    res.status(500).json({ message: "Server Error", error: err });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id ,username},JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error("Login Error:", err);  
    res.status(500).json({ message: "Server Error", error: err });
  }
};
