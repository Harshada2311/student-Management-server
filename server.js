const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoute = require('./Routes/studentRoutes');
const authRoutes = require('./Routes/authRoutes');

const app = express();
const port = 5400;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*", // change to ["http://localhost:3000"] in production
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use('/api/students', studentRoute);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Server
app.listen(port, () => console.log(`Server running on port ${port}`));
