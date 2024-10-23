const Product = require('../models/product.model');
const Bid = require("../models/bid.model")
const createProduct = async (req, res) => {
  try {
    const { type, title, description, startingPrice } = req.body;
    if (!['property', 'vehicle'].includes(type)) {
      return res.status(400).json({ message: 'Invalid product type' });
    }

    const productData = {
      type,
      title,
      description,
      startingPrice,
    };

    const { address, photos } = req.body;
    if (type === 'property') {
      productData.address = address;
    } else if (type === 'vehicle') {
      const { number, details, vehicleType } = req.body;
      productData.number = number;
      productData.details = details;
      productData.vehicleType = vehicleType;
    }
    productData.photos = photos || [];
    const product = await  Product.create(productData);
    const activeUsers=req.activeUsers
    const filterUser=Array.from(activeUsers.values())
    
    filterUser.forEach((el)=>{
      if(el!==activeUsers.get(process.env.ADMINUSERID)){
        req.io.to(el).emit("newProduct", product)
      }else{
        console.log(activeUsers,process.env.ADMINUSERID)
      }
    })

    
    res.status(201).send(product);
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

const getProducts = async (req, res) => {
    try {
      const products = await Product.find({ status: 'available' })
        .populate({
          path: 'bids', 
          populate: { path: 'user', select: 'username email' }  
        })
        .sort({ createdAt: -1 });
  
      res.status(200).send(products);
    } catch (error) {
      console.error('Error in getProducts:', error);
      res.status(500).send({ message: 'Server error' });
    }
  };
  

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.find({_id:productId})
      .populate({
        path: 'bids',
        populate: { path: 'user', select: 'username email' },
      });
  
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    const updates = req.body;
    if (product.type === 'property') {
      const { address, photos } = updates;
      if (address) product.address = address;
      
    } else if (product.type === 'vehicle') {
      const { number, details, vehicleType } = updates;
      if (number) product.number = number;
      if (details) product.details = details;
      if (vehicleType) product.vehicleType = vehicleType;
    }
    if (updates.photos){
      product.photos=updates.photos
    }
    if (updates.title) product.title = updates.title;
    if (updates.description) product.description = updates.description;
    if (updates.startingPrice) product.startingPrice = updates.startingPrice;
    await product.save();
    res.status(201).send(product)
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    let product = await Product.deleteOne({_id:productId});

    res.status(204).send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const confirmBid = async (req, res) => {
  const { productId, bidId } = req.body;
  
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    const successfulBid = await Bid.findByIdAndUpdate(
      bidId, 
      { status: 'successful' }, 
      { new: true }
    );

    if (!successfulBid) {
      return res.status(404).send({ error: 'Bid not found' });
    }

    await Bid.updateMany(
      { _id: { $ne: bidId }, product: productId }, 
      { status: 'canceled' }
    );

    product.status = 'sold';
    await product.save();
    await product.populate({
      path: 'bids',
      populate: { path: 'user', select: 'username email' },
    })
    res.status(200).send({ message: 'Bid confirmed successfully', product, successfulBid });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {createProduct,deleteProduct,getProductById,updateProduct,getProducts,confirmBid }