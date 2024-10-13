const Product = require('../models/product.model');
const Bid = require('../models/bid.model');
const User = require('../models/user.model');

// Create a bid for a specific product
const createBid = async (req, res) => {
  try {
    const { productId } = req.params;
    const {  bidAmount ,userId} = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    if (bidAmount <= product.startingPrice) {
      return res.status(400).send({ message: 'Bid must be higher than the starting price' });
    }
    const bid = await Bid.create({
      product: productId,
      user: userId,
      amount:bidAmount
    });

    product.bids.push(bid._id);
    await product.save();

    res.status(201).send({ message: 'Bid placed successfully', bid });
  } catch (error) {
    console.error('Error in createBid:', error);
    res.status(500).send({ message: 'Server error' });
  }
};
const updateBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { bidAmount } = req.body;
    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).send({ message: 'Bid not found' });
    }
    const product = await Product.findById(bid.product);
    if (bidAmount <= product.startingPrice) {
      return res.status(400).send({ message: 'New bid amount must be higher than the starting price' });
    }
    bid.amount = bidAmount;
    await bid.save();

    res.status(200).send({ message: 'Bid updated successfully', bid });
  } catch (error) {
    console.error('Error in updateBid:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

const deleteBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const bid = await Bid.findByIdAndDelete(bidId);
    if (!bid) {
      return res.status(404).send({ message: 'Bid not found' });
    }
    await Product.findByIdAndUpdate(bid.product, { $pull: { bids: bidId } });
    res.status(204).send({ message: 'Bid deleted successfully' });
  } catch (error) {
    console.error('Error in deleteBid:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

module.exports = { createBid, updateBid, deleteBid };
