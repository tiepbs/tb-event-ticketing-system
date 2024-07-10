const Ticket = require('../models/Ticket');
const User = require('../models/User');
const QRCode = require('qrcode');
const Jimp = require('jimp');
const path = require('path');

exports.purchaseTicket = async (req, res) => {
  try {
    const { userId, event, name, email, phone } = req.body;

    console.log('Request body:', req.body);  // Thêm dòng này để in ra dữ liệu nhận được

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    await user.save();

    const qrCodeData = `Event: ${event}, User: ${userId}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    const qrImage = await Jimp.read(Buffer.from(qrCodeImage.split(",")[1], 'base64'));
    const logoPath = path.join(__dirname, '../assets/logo.png'); // Đường dẫn tới file logo của bạn
    const logo = await Jimp.read(logoPath);

    const logoSize = qrImage.bitmap.width / 5;
    logo.resize(logoSize, logoSize);
    const x = (qrImage.bitmap.width / 2) - (logo.bitmap.width / 2);
    const y = (qrImage.bitmap.height / 2) - (logo.bitmap.height / 2);
    qrImage.composite(logo, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1,
      opacityDest: 1
    });

    const qrWithLogo = await qrImage.getBase64Async(Jimp.MIME_PNG);

    const ticket = new Ticket({
      user: user._id,
      event,
      qrCode: qrCodeData,
      qrCodeImage: qrWithLogo
    });
    await ticket.save();

    res.status(201).json({ message: 'Ticket purchased successfully', qrCode: qrWithLogo });
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    res.status(500).json({ message: 'Error purchasing ticket', error: error.message });
  }
};

exports.scanQrCode = async (req, res) => {
  try {
    const { qrCode } = req.body;

    const ticket = await Ticket.findOne({ qrCode }).populate('user');
    if (!ticket) {
      return res.status(404).json({ message: 'Invalid QR code' });
    }

    const user = ticket.user;
    const userInfo = {
      name: user.name,
      email: user.email,
      phone: user.phone
    };

    res.status(200).json({ message: 'QR code is valid', userInfo, event: ticket.event });
  } catch (error) {
    res.status(500).json({ message: 'Error scanning QR code', error: error.message });
  }
};
