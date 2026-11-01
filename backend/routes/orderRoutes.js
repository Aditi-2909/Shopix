const express = require('express'); 
const {protect} = require('../middleware/authMiddleware');
const {admin} = require("../middleware/adminMiddleware");
const {createOrder, getOrders, myOrders, updateOrderStatus, getOrderById} = require('../controllers/orderController');

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, myOrders);

// Deliver er jonno 2to route rakhlam - jeta diyei call koro kaj korbe
router.route('/:id').get(protect, getOrderById); 
router.route('/:id/status').put(protect, admin, updateOrderStatus);
router.route('/:id/deliver').put(protect, admin, updateOrderStatus); // <-- Frontend eta call kore

module.exports = router;