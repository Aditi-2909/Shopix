const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const{admin}=require("../middleware/adminMiddleware");
const{createOrder,getOrders,getOrderById,updateOrderStatus}=require("../controllers/orderController");

const router = express .Router();

router.route('/').post(protect,createOrder).get(protect,admin,getOrders);
router.route('/myorders').get(protect,getOrdersById);
router.route('/:id/status').get(protect, getOrderById).put(protect, admin, updateOrderStatus);


module.exports = router;