const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  event: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventDate: { type: Date, required: true },
  attendanceStatus: { type: String, default: 'Not Determined Yet' }
});

module.exports = mongoose.model('Ticket', ticketSchema);
