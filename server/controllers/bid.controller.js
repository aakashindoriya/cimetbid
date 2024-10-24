const Product = require('../models/product.model');
const Bid = require('../models/bid.model');

const createBid = async (req, res) => {
  try {
    const { productId } = req.params;
    const {  bidAmount } = req.body;
    const userId = req.user._id
    const existingBid = await Bid.findOne({ product: productId, user: userId });
    if (existingBid) {
      return res.status(400).send({ message: 'You have already placed a bid on this product.' });
    }
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
    const activeUsers=req.activeUsers
    const adminSoketid=activeUsers.get(process.env.ADMINUSERID)
    req.io.to(adminSoketid).emit("newBid",{bid,product})
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
    const userId = req.user._id;
    if (bid.user.toString()!== userId.toString()) {
      return res.status(403).send({ message: 'Unauthorized to update this bid' });
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
    const userId = req.user._id;
    
    const { bidId } = req.params;
    const bid = await Bid.findByIdAndDelete(bidId);
    if (!bid) {
      return res.status(404).send({ message: 'Bid not found' });
    }
    if (bid.user.toString()!== userId.toString()) {
      return res.status(403).send({ message: 'Unauthorized to delete this bid' });
    }
    await Product.findByIdAndUpdate(bid.product, { $pull: { bids: bidId } });
    res.status(204).send({ message: 'Bid deleted successfully' });
  } catch (error) {
    console.error('Error in deleteBid:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

const getUserBids = async (req, res) => {
  try {
    const userId = req.user._id;  
    const bids = await Bid.find({ user: userId }).sort({amount:-1}).populate('product', 'title type startingPrice photos');
    res.status(200).send(bids);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};


module.exports = { createBid, updateBid, deleteBid ,getUserBids };
