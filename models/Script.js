const mongoose = require('mongoose');
const { Schema } = mongoose;

const scriptSchema = new Schema({
  info: {
    start: Number,
    profit: Number,
    duration: Number,
    sum: Number,
    step: Number,
    creator: { 
      roles: {
        type: [ String ],
        default: [ 'admin' ]
      }, 
      username: String 
    },
    creatorId: String,
    clientId: String,
    traderId: String,
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    trader: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    },
    clientEmail: String,
  },
  list: {
    type: [[Number, Number]]
  }
});

module.exports = mongoose.model('Script', scriptSchema);
