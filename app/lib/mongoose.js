// lib/mongoose.js
import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return; // If the connection is already established, return
  }
  try {
    await mongoose.connect("mongodb+srv://alsomedroo:a_6bKwPk75_8bMh@cluster0.zdyf6.mongodb.net/foodoscope", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDb;
