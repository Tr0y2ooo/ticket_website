// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.get('/', (req, res) => {
  res.send('🎫 Concert Ticket Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const orderRoutes = require('./routes/order');
app.use('/api/order', orderRoutes);

