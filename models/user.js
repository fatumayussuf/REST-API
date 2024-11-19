import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

// Create the User model with the explicit collection name
const User = mongoose.model('User', userSchema, 'user'); // Explicitly use 'user' collection

// Export the User model as the default export
export default User;
