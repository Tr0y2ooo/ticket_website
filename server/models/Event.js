// server/models/Event.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  type: String,
  price: Number,
  quantity: Number,
});

const EventSchema = new mongoose.Schema({
  artist: String,
  location: String,
  datetime: Date,
  tickets: [TicketSchema],
});

module.exports = mongoose.model('Event', EventSchema);
