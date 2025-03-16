const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: ["admin"]
  },
  active: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('Admin', clientSchema);
