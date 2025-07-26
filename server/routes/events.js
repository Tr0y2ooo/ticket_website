// server/routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/create', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

module.exports = router;
