const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const QRCode = require('qrcode');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Username or password is missing');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      console.log('Username already exists');
      return res.status(400).json({ message: 'Username already exists' });
    }

    console.log('Register request received:', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    await user.save();
    console.log('User successfully registered');
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Username or password is missing');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username: username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      console.log('Invalid credentials');
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    console.log('Login successful');
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};

exports.purchaseTicket = async (req, res) => {
  try {
    const { userId, event, name, email, phone } = req.body;

    // Cập nhật thông tin cá nhân
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    await user.save();

    // Tạo QR code
    const qrCode = await QRCode.toDataURL(`Event: ${event}, User: ${userId}`);

    // Lưu thông tin vé
    const ticket = new Ticket({
      user: user._id,
      event,
      qrCode,
    });
    await ticket.save();

    console.log('Ticket purchased successfully');
    res.status(201).json({ message: 'Ticket purchased successfully', qrCode });
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    res.status(500).json({ message: 'Error purchasing ticket', error: error.message });
  }
};
