# Event Ticketing System with QR Code Generation and Scanning

## Overview
This project is a web application for an event ticketing system. It allows students to purchase tickets for events and generates a QR code for each ticket. Admin staff can scan the QR codes to confirm attendance.

## Features
- User registration and login
- Ticket purchase with QR code generation
- QR code scanning to validate and confirm attendance
- Responsive design using Bootstrap

## Technologies Used
- Frontend: React, Bootstrap
- Backend: Node.js, Express, MongoDB
- QR Code: `html5-qrcode`
- Authentication: JSON Web Tokens (JWT)

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

### Clone the Repository
```sh
git clone https://github.com/your-username/event-ticketing-system.git
cd event-ticketing-system
```
### Setup Frontend
- Navigate to the frontend directory:

```sh
cd frontend
```
- Install dependencies:
```sh
npm install
```
- Start the frontend server:
```sh
npm start
```
### Setup Backend
- Navigate to the backend directory:
```sh
cd ../backend
```
- Install dependencies:
```sh
npm install
```
- Create a .env file in the backend directory and add the following environment variables:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
- Start the backend server:
```sh
npm start
```
## Usage
### User Registration
- Navigate to the registration page at http://localhost:3000/register.
- Fill in the required fields and submit the form to create an account.
### User Login
- Navigate to the login page at http://localhost:3000/login.
- Enter your credentials and log in.
### Ticket Purchase
After logging in, navigate to http://localhost:3000/tickets.
- Fill in the event details and personal information.
- Submit the form to purchase a ticket and receive a QR code.
### QR Code Scanning (Admin)
- Navigate to the admin portal at http://localhost:3000/scan.
- Use the QR code scanner to scan a student's QR code.
- If valid, the student's information will be displayed along with a button to confirm attendance.
## Project Structure
```csharp
event-ticketing-system/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── QrCodeScanner.js
│   │   │   ├── Register.js
│   │   │   ├── TicketPurchase.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```
## License
This project is licensed under the MIT License and PLChi Solutions. See the LICENSE file for more details.

## Contact
For any inquiries, please contact tiep[at]plchi[dot]com