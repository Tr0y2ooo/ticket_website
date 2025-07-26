const express = require('express');
const router = express.Router();
const orderQueue = require('../queue/orderQueue');
const redis = require('ioredis');
const Redis = new redis();

router.post('/buy', async (req, res) => {
  const { eventId, ticketType } = req.body;
  const redisKey = `stock:${eventId}:${ticketType}`;

  // 減少 Redis 中的票數
  const stock = await Redis.decr(redisKey);

  if (stock < 0) {
    await Redis.incr(redisKey); // 補回去
    return res.status(400).json({ message: '票已售完啦，主人 Q_Q' });
  }

  // 推入佇列中由後台處理
  await orderQueue.add({ eventId, ticketType });

  res.json({ message: '搶票成功！訂單處理中唷，主人♥' });
});

module.exports = router;
