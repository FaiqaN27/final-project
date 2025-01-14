import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const registerAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminRole = process.env.ADMIN_ROLE || 'admin';

    if (!adminEmail || !adminPassword) {
      console.log('Admin credentials are not set in environment variables.');
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new User({
      email: adminEmail,
      password: hashedPassword,
      role: adminRole,
    });

    await newAdmin.save();
    console.log('Admin user registered successfully!');
  } catch (error) {
    console.error('Error registering admin user:', error);
  }
};
