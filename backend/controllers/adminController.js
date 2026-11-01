const User = require('../model/User');
const Product = require('../model/Product');
const Order = require('../model/Order');

// GET /api/admin/analytics
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    const orders = await Order.find();
    const totalSales = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    res.json({ totalUsers, totalProducts, totalOrders, totalSales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/products
const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

// GET /api/admin/orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

// POST /api/admin/product
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.status(201).json(created);
};

// DELETE /api/admin/product/:id
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted successfully' });
};

module.exports = { 
  getAnalytics, 
  getAllProducts, 
  getAllOrders, 
  getAllUsers, 
  createProduct, 
  deleteProduct 
};