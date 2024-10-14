const Product = require('../models/product.model');

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

    if (type === 'property') {
      const { address, photos } = req.body;
      productData.address = address;
      productData.photos = photos || [];
    } else if (type === 'vehicle') {
      const { number, details, vehicleType } = req.body;
      productData.number = number;
      productData.details = details;
      productData.vehicleType = vehicleType;
    }

    const product = await  Product.create(productData);
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
      if (photos) product.photos = photos;
    } else if (product.type === 'vehicle') {
      const { number, details, vehicleType } = updates;
      if (number) product.number = number;
      if (details) product.details = details;
      if (vehicleType) product.vehicleType = vehicleType;
    }

    if (updates.title) product.title = updates.title;
    if (updates.description) product.description = updates.description;
    if (updates.startingPrice) product.startingPrice = updates.startingPrice;

    await product.save();

    res.status(201).send(product);
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


module.exports = {createProduct,deleteProduct,getProductById,updateProduct,getProducts}