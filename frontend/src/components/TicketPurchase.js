import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Container, Form, Button, Alert } from 'react-bootstrap';

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
      setUserId(decoded.userId);
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
        body: JSON.stringify({ event, name, email, phone, userId }),
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
    <Container className="mt-5">
      <h2 className="text-center mb-4">Tiep Bui - POC for Joyous - Generate QR Code for Event Registration/Ticket Purchase (Student Portal)</h2>
      <p>- Note: This is to demonstrate the use-case the QR Code will be generated upon event registration success</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEvent">
          <Form.Label>Event</Form.Label>
          <Form.Control
            type="text"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            placeholder="Event"
            required
          />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Purchase</Button>
      </Form>
      {qrCode && (
        <Alert variant="success" className="mt-4 text-center">
          <h3>QR Code:</h3>
          <img src={qrCode} alt="QR Code" />
        </Alert>
      )}
    </Container>
  );
};

export default TicketPurchase;
