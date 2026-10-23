// const Order = require('../model/Order');
// const sendEmail = require('../utils/sendEmail');

// // Create a new order
// const createOrder = async (req, res) => {
//     try {
//         const { items, totalAmount, address, paymentId } = req.body;

//         if (!items || items.length === 0 || !totalAmount || !address) {
//             return res.status(400).json({ message: 'Invalid order data' });
//         } else {
//             const order = new Order({
//                 user: req.user._id,
//                 items,
//                 totalAmount,
//                 address,
//                 paymentId
//             });
//             await order.save();

//             const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully crreated with the following details:\n\nOrder ID: ${order._id}\nTotal Amount: $${totalAmount}\nShipping Address: ${address}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nShopix Team`;

//             await sendEmail(req.user.email, 'Order Created', message);
//             res.status(201).json({ message: 'Order created successfully', order });
//         }

//     } catch (error) {
//         res.status(500).json({ message: 'Error creating order', error });
//     }
// };

// // my orders
// const myOrders = async (req, res) => {
//     try{
//         const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price');
//         res.json({ orders });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching orders', error });
//     }
// };
// const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id).populate('items.productId', 'name price image');
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         // Sudhu jar order sei dekhte parbe
//         if (order.user.toString() !== req.user._id.toString()) {
//             return res.status(401).json({ message: 'Not authorized' });
//         }
//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching order', error });
//     }
// };

// //get all orders
// const getOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({}).populate('user', 'id name');
//         res.json({ orders });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching orders', error });
//     }
// };

// //
// const updateOrderStatus = async (req, res) => {
//     try {
//         const {status} = req.body;
//         const order = await Order.findById(req.params.id);
//         if(order){
//             order.status = status;
//             await order.save();
//             res.json({ message: 'Order status updated', order });
//         } else {
//             res.status(404).json({ message: 'Order not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating order status', error });
//     }
// }

// module.exports = {
//     createOrder,
//     myOrders,
//     getOrders,
//     updateOrderStatus,
//     getOrderById
// };


const Order = require('../model/Order');
const Product = require('../model/Product'); // Added for image snapshot
const sendEmail = require('../utils/sendEmail');

// Create a new order - Now saves image snapshot also
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        // Enrich items with product details (name, price, image) to avoid future populate issues
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
                return {
                    ...item,
                    qty: item.qty || item.quantity || 1,
                    quantity: item.quantity || item.qty || 1
                };
            }
        }));

        const order = new Order({
            user: req.user._id,
            items: enrichedItems,
            totalAmount,
            address,
            paymentId
        });
        
        await order.save();

        // Send confirmation email
        const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully created with the following details:\n\nOrder ID: ${order._id}\nTotal Amount: $${totalAmount}\nShipping Address: ${address}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nShopix Team`;

        await sendEmail(req.user.email, 'Order Created', message);
        
        res.status(201).json({ message: 'Order created successfully', order });

    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get logged in user's orders
const myOrders = async (req, res) => {
    try{
        const orders = await Order.find({ user: req.user._id })
            .populate('items.productId', 'name price image images imageUrl thumbnail')
            .sort({ createdAt: -1 });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Get single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.productId', 'name price image images imageUrl thumbnail');
            
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Only owner can view his order
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view this order' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

// Get all orders - Admin only
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'id name email')
            .sort({ createdAt: -1 });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Update order status - Admin only
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        
        if(order){
            order.status = status;
            await order.save();
            res.json({ message: 'Order status updated', order });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
}

module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus,
    getOrderById
};