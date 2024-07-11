const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/purchase', ticketController.purchaseTicket);
router.post('/scan-qr', ticketController.scanQrCode);
router.get('/attendance-status', ticketController.getAllUsersWithAttendance);

module.exports = router;
