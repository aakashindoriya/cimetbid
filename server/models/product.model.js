const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  type: { type: String, enum: ['property', 'vehicle'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  startingPrice: { type: Number, required: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
  address: { type: String },
  photos: [{ type: String }],
  number: { type: String },
  details: { type: String },
  vehicleType: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
