const redis = require('ioredis');
const Redis = new redis();
const Event = require('../models/Event');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const events = await Event.find();
  for (const event of events) {
    for (const ticket of event.tickets) {
      const key = `stock:${event._id}:${ticket.type}`;
      await Redis.set(key, ticket.quantity);
      console.log(`Redis 初始化：${key} = ${ticket.quantity}`);
    }
  }
  process.exit();
});
