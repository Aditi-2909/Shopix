const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const { 
  getAnalytics, 
  getAllProducts, 
  getAllOrders, 
  getAllUsers 
} = require("../controllers/adminController");

// Admin Dashboard er 4 te API
router.get("/analytics", protect, admin, getAnalytics);
router.get("/products", protect, admin, getAllProducts);
router.get("/orders", protect, admin, getAllOrders);
router.get("/users", protect, admin, getAllUsers);

module.exports = router;