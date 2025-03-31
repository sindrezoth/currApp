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
    trader: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    },
    clientEmail: String
  },
  list: {
    type: [[Number, Number]]
  }
});

module.exports = mongoose.model('Script', scriptSchema);
