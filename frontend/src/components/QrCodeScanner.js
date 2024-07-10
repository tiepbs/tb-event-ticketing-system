import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

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
    <div>
      <h2>Scan QR Code</h2>
      <div id="qr-reader" style={{ width: '500px' }}></div>
      <div>
        <h3>Scan Result:</h3>
        <p>{scanResult}</p>
      </div>
      {validationMessage && (
        <div>
          <h3>Validation Message:</h3>
          <p>{validationMessage}</p>
        </div>
      )}
      {userInfo && (
        <div>
          <h3>User Information:</h3>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
          <p><strong>Event:</strong> {userInfo.event}</p>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;
