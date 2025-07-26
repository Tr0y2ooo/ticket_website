const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderQueue = require('./queue/orderQueue');
const Event = require('./models/Event');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Worker connected to MongoDB');
});

orderQueue.process(async (job) => {
  const { eventId, ticketType } = job.data;

  // 從資料庫找出活動
  const event = await Event.findById(eventId);
  const ticket = event.tickets.find(t => t.type === ticketType);

  if (ticket && ticket.quantity > 0) {
    ticket.quantity -= 1;
    await event.save();
    console.log(`🎫 成功扣除一張 ${ticketType} 的票`);
  } else {
    console.log(`❌ 資料庫票已售完`);
  }
});
