import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js'; // Ensure the path is correct

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up the MongoDB URI using the environment variable for password
const uri = `mongodb+srv://fatumayussuf:${process.env.MONGODB_PASSWORD}@cluster0.r1xw2.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB connection (Updated with removed deprecated options)
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET: Return all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add a new user to the database
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  const user = new User({
    name,
    email,
    age
  });

  try {
    const newUser = await user.save();  // Save the user to the database
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);  // Remove the user by ID
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
