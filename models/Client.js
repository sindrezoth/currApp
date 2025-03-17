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
      hash: String,
      currency: {
        type: String,
        enum: ['rub', 'usd']
      },
      amount: Number
    }],
    default: [{currency: 'usd', amount: 0}]
  },
  actions: {
    type: [

      {
        action: String,
        timestamp: {
          type: Number,
          default: () => Date.now()
        }
      }
    ]
  },
  createdAt: {
    type: Number,
    default: () => Date.now()
  },
  updatedAt: {
    type: Number,
    default: () => Date.now()
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

}, { timestamps: true });

clientSchema.virtual('invested', {
  ref: 'Invest',
  localField: '_id',
  foreignField: 'client'
});

module.exports = mongoose.model('Client', clientSchema)
