const QRCode = require('qrcode');

const generateQrCode = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
    throw new Error('Could not generate QR code');
  }
};

module.exports = generateQrCode;
