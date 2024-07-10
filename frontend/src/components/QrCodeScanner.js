import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Container, Alert, Button } from 'react-bootstrap';

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const onScanSuccess = async (decodedText) => {
    console.log(`Scan result: ${decodedText}`);
    setScanResult(decodedText);

    // Gửi yêu cầu tới backend để xác thực QR code
    try {
      const response = await fetch('/tickets/scan-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCode: decodedText }),
      });

      if (response.ok) {
        const data = await response.json();
        setValidationMessage('QR Code valid.');
        setUserInfo({
          name: data.userInfo.name,
          email: data.userInfo.email,
          phone: data.userInfo.phone,
          event: data.event
        });
      } else {
        const errorData = await response.json();
        setValidationMessage(`Error: ${errorData.message}`);
        setUserInfo(null);
      }
    } catch (error) {
      console.error('Error scanning QR code:', error);
      setValidationMessage('Error scanning QR code');
      setUserInfo(null);
    }
  };

  const handleConfirmAttendance = async () => {
    // Logic để xác nhận tham dự
    alert('Attendance confirmed for ' + userInfo.name);
  };

  React.useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: 250 },
      /* verbose= */ false
    );
    scanner.render(onScanSuccess);

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Tiep Bui - POC for Joyous - Ticket QR Code Scanning System (Admin/School admin portal)</h2>
      <p> - Note: Admin staff will need to login into Admin/School admin portal to scan QR code and confirm attendance status of the student </p>
      <div id="qr-reader" style={{ width: '500px', margin: '0 auto' }}></div>
      <div className="text-center mt-4">
        <h3>Scan Result:</h3>
        <p>{scanResult}</p>
      </div>
      {validationMessage && (
        <Alert variant="info" className="text-center">
          <h3>Validation Message:</h3>
          <p>{validationMessage}</p>
        </Alert>
      )}
      {userInfo && (
        <Alert variant="success" className="text-center">
          <h3>Student Information:</h3>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
          <p><strong>Event:</strong> {userInfo.event}</p>
          <Button onClick={handleConfirmAttendance} className="mt-3">
            Confirm Attendance Status
          </Button>
          <p className="mt-2">Please click here to confirm the attendance of this student</p>
        </Alert>
      )}
    </Container>
  );
};

export default QrCodeScanner;
