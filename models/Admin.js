const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
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
  },
  attachedClients: {
    type: mongoose.Schema.Types.ObjectId,
  }
})

adminSchema.virtual('tradered', {
  ref: 'Invest',
  localField: '_id',
  foreignField: 'admin'
});

module.exports = mongoose.model('Admin', adminSchema);
