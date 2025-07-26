const Queue = require('bull');
const orderQueue = new Queue('order-queue', {
  redis: { port: 6379, host: '127.0.0.1' }
});

module.exports = orderQueue;
