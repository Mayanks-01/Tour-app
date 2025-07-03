const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number
});

const tourSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String, // Image URL or base64 string for now
  steps: [stepSchema],
  isPublic: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);
