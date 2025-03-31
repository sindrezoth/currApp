const mongoose = require('mongoose')
const { Schema } = mongoose;

const clientSchema = new Schema({
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
  scripts: {
    type: [Schema.Types.ObjectId],
    ref: 'Script'
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
  },
  trader: {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  },
  deleted: {
    type: Boolean,
    deafult: false
  }
});

clientSchema.virtual('invested', {
  ref: 'Invest',
  localField: '_id',
  foreignField: 'client'
});

module.exports = mongoose.model('Client', clientSchema)
