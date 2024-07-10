const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  qrCodeImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);
