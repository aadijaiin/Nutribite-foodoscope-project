// app/api/auth/sign-in.js
import connectDb from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export const POST = async (req) => {
  const { email, password } = await req.json();
  await connectDb();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 400 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'Sign-in successful' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error signing in' }), { status: 500 });
  }
};
