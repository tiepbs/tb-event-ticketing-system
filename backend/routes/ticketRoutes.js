const express = require('express');
const { purchaseTicket, scanQrCode } = require('../controllers/ticketController'); // Đảm bảo import đúng

const router = express.Router();

router.post('/purchase', purchaseTicket);
router.post('/scan-qr', scanQrCode);

module.exports = router;
