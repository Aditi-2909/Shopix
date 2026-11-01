const Order = require('../model/order');
const Product = require('../model/product');
const sendEmail = require('../utils/sendEmail');

// Create order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const enrichedItems = await Promise.all(items.map(async (item) => {
            try {
                const product = await Product.findById(item.productId);
                return {
                    productId: item.productId,
                    name: product?.name || item.name,
                    price: product?.price || item.price,
                    image: product?.image || product?.images?.[0] || item.image || "",
                    qty: item.qty || item.quantity || 1,
                    quantity: item.quantity || item.qty || 1
                };
            } catch (e) {
                return { ...item, qty: item.qty || item.quantity || 1, quantity: item.quantity || item.qty || 1 };
            }
        }));

        const order = new Order({
            user: req.user._id,
            items: enrichedItems,
            totalAmount,
            totalPrice: totalAmount, // frontend er jonno 2toi save korlam
            address,
            shippingAddress: { fullName: address },
            paymentId,
            isPaid: true,
            paidAt: new Date()
        });
        
        await order.save();
        await sendEmail(req.user.email, 'Order Created', `Order ID: ${order._id} Amount: ${totalAmount}`).catch(()=>{});
        res.status(201).json({ message: 'Order created', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// My orders
const myOrders = async (req, res) => {
    try{
        const orders = await Order.find({ user: req.user._id })
            .populate('items.productId', 'name price image')
            .sort({ createdAt: -1 });
        res.json(orders); // direct array return - frontend er sathe match
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Single order
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.productId', 'name price image').populate('user','name email');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        
        // Admin hole anyone dekhte parbe, user hole sudhu nijer ta
        if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString() && order.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

// All orders - Admin only - DIRECT ARRAY
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(orders); // {orders} na, direct orders array
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Update status - 2ta route support korbe
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({ message: 'Order not found' });

        if(req.body.status) order.status = req.body.status;
        
        // Deliver mark
        order.isDelivered = true;
        order.deliveredAt = new Date();
        order.status = 'Delivered';
        
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating', error: error.message });
    }
}

module.exports = { createOrder, myOrders, getOrders, updateOrderStatus, getOrderById };