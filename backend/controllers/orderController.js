const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });
        } else {
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });
            await order.save();

            const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully crreated with the following details:\n\nOrder ID: ${order._id}\nTotal Amount: $${totalAmount}\nShipping Address: ${address}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nShopix Team`;

            await sendEmail(req.user.email, 'Order Created', message);
            res.status(201).json({ message: 'Order created successfully', order });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};