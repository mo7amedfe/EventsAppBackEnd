const mongoose = require('mongoose');

const bookedEventSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  booking_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BookedEvent', bookedEventSchema);