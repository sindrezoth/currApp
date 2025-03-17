const mongoose = require('mongoose')

const investSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  trader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  coin: {
    type: String,
    //enum: ['btc','eth'],
  },
  invest:  {
    currency: {
      type: String,
      //enum: ['rub', 'usd']
    },
    amount: Number
  },
  target: {
    amount: Number
  },
  progress: {
    type: [[Number]]
  },
  status: {
    type: String,
    enum: ['open', 'closed']
  }
});

module.exports = mongoose.model('Invest', investSchema);
