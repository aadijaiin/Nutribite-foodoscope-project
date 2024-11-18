// app/api/auth/sign-up.js
import connectDb from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export const POST = async (req) => {
  const { name, email, password } = await req.json();
  await connectDb();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating user' }), { status: 500 });
  }
};
