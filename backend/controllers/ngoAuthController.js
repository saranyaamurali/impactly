const User = require('../models/User');
const NGO = require('../models/NGO');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ngoAuthController = {
  // Register NGO
  registerNgo: async (req, res) => {
    try {
      const {
        ngoName,
        email,
        password,
        mission,
        website,
        focusAreas,
        contactPerson,
        phone,
      } = req.body;

      // Validate input
      if (!ngoName || !email || !password || !mission || !contactPerson || !phone) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = new User({
        email,
        password: hashedPassword,
        role: 'ngo',
      });

      await user.save();

      // Create NGO profile
      const ngo = new NGO({
        userId: user._id,
        ngoName,
        email,
        mission,
        website,
        focusAreas,
        contactPerson,
        phone,
      });

      await ngo.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: 'ngo', ngoId: ngo._id },
        process.env.JWT_SECRET || 'impactly-dev-secret',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'NGO registered successfully',
        token,
        ngo: {
          id: ngo._id,
          ngoName: ngo.ngoName,
          email: ngo.email,
        },
      });
    } catch (error) {
      console.error('NGO registration error:', error);
      res.status(500).json({ message: 'Failed to register NGO' });
    }
  },

  // Login NGO
  loginNgo: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Find user
      const user = await User.findOne({ email, role: 'ngo' });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Get NGO profile
      const ngo = await NGO.findOne({ userId: user._id });

      // Generate token
      const token = jwt.sign(
        { userId: user._id, role: 'ngo', ngoId: ngo._id },
        process.env.JWT_SECRET || 'impactly-dev-secret',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        ngo: {
          id: ngo._id,
          ngoName: ngo.ngoName,
          email: ngo.email,
          mission: ngo.mission,
        },
      });
    } catch (error) {
      console.error('NGO login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  },

  // Verify Token
  verifyToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'impactly-dev-secret'
      );

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      res.json({
        valid: true,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  },

  // Change Password
  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.userId;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Old password is incorrect' });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Password change error:', error);
      res.status(500).json({ message: 'Failed to change password' });
    }
  },

  // Reset Password (forgot password)
  resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required' });
      }

      const user = await User.findOne({ email, role: 'ngo' });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Failed to reset password' });
    }
  },
};

module.exports = ngoAuthController;
