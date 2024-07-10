const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const app = express();

require('dotenv').config();

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
