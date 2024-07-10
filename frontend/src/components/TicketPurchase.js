import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const TicketPurchase = () => {
  const [event, setEvent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId); // Đảm bảo rằng userId được lấy từ token
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/tickets/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ event, name, email, phone, userId }), // Sử dụng userId từ token
      });

      if (response.ok) {
        const data = await response.json();
        alert('Ticket purchased successfully');
        setQrCode(data.qrCode);
      } else {
        const errorData = await response.json();
        alert(`Error purchasing ticket: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error purchasing ticket:', error);
      alert('Error purchasing ticket');
    }
  };

  return (
    <div>
      <h2>Purchase Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="Event"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <button type="submit">Purchase</button>
      </form>
      {qrCode && (
        <div>
          <h3>QR Code:</h3>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default TicketPurchase;
