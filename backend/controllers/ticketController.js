const User = require('../models/User');
const Ticket = require('../models/Ticket');
const QRCode = require('qrcode');

exports.purchaseTicket = async (req, res) => {
  const { event, name, email, phone, eventDate, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTicket = new Ticket({
      event,
      user: userId,
      eventDate: new Date(eventDate)
    });
    await newTicket.save();

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.ticket = newTicket._id;
    await user.save();

    const qrCodeData = {
      event,
      user: userId
    };
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrCodeData));

    res.status(201).json({ message: 'Ticket purchased successfully', qrCode });
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    res.status(500).json({ message: 'Error purchasing ticket', error });
  }
};

exports.scanQrCode = async (req, res) => {
  const { qrCode } = req.body;
  console.log('Received QR code:', qrCode);
  try {
    const decodedData = JSON.parse(qrCode);
    console.log('Decoded data:', decodedData);
    const ticket = await Ticket.findOne({ event: decodedData.event, user: decodedData.user }).populate('user');
    if (!ticket) {
      return res.status(404).json({ message: 'Invalid QR code' });
    }

    res.status(200).json({ message: 'QR Code valid', userInfo: ticket.user });
  } catch (error) {
    console.error('Error scanning QR code:', error);
    res.status(500).json({ message: 'Error scanning QR code', error });
  }
};


exports.getAllUsersWithAttendance = async (req, res) => {
  try {
    const users = await User.find().populate('ticket');
    const currentDate = new Date();
    const usersWithAttendance = users.map(user => {
      const attendanceStatus = user.ticket ? (user.ticket.attendanceConfirmed ? 'Yes' : (currentDate > user.ticket.eventDate ? 'No' : 'Not Determined Yet')) : 'Not Determined Yet';
      return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        event: user.ticket ? user.ticket.event : '',
        attendanceStatus
      };
    });
    res.status(200).json(usersWithAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users with attendance status', error });
  }
};
