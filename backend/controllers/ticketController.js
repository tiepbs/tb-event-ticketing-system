const Ticket = require('../models/Ticket');
const User = require('../models/User');
const QRCode = require('qrcode');
const Jimp = require('jimp');

exports.purchaseTicket = async (req, res) => {
  try {
    const { userId, event, name, email, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    await user.save();

    const qrCodeData = `Event: ${event}, User: ${userId}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    // Load QR code image and logo
    const qrImage = await Jimp.read(Buffer.from(qrCodeImage.split(",")[1], 'base64'));
    const logo = await Jimp.read('path/to/your/logo.png'); // Đường dẫn tới file logo của bạn

    // Resize logo and composite on QR code
    const logoSize = qrImage.bitmap.width / 5; // Adjust the logo size relative to the QR code
    logo.resize(logoSize, logoSize); // Resize logo to be smaller
    const x = (qrImage.bitmap.width / 2) - (logo.bitmap.width / 2);
    const y = (qrImage.bitmap.height / 2) - (logo.bitmap.height / 2);
    qrImage.composite(logo, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1,
      opacityDest: 1
    });

    // Convert back to Base64
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
    res.status(500).json({ message: 'Error purchasing ticket', error: error.message });
  }
};
