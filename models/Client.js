const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: false,
    default: ""
  },
  lastname: {
    type: String,
    required: false,
    default: ""
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  country: {
    type: Object,
    label: String,
    value: String,
    required: true
  },
  traderId: String,
  wallet: {
    type: [{
      currency: {
        type: String,
        enum: ['rub', 'usd']
      },
      amount: Number
    }],
    default: [{currency: 'usd', amount: 0}]
  },
  invested: {
    type: [{
      id: String,
      coin: {
        type: String,
        enum: ['btc','eth'],
      },
      invest:  {
        currency: {
          type: String,
          enum: ['rub', 'usd']
        },
        amount: Number
      },
      difference: {
        amount: Number
      }
    }],
    default: []
  },
  verifyed: {
    Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  blocked: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Client', clientSchema)
