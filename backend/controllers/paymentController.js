const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config(); // FIXED

const createdOrder = async (req, res) => {
    try {
        // Debug log - terminal e dekhabe
        console.log("Creating order for amount:", req.body.amount);
        console.log("Key loaded?", process.env.RAZORPAY_KEY_ID ? "YES" : "NO - .env missing");

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ message: "Razorpay keys missing in backend .env file" });
        }

        if (!req.body.amount) {
            return res.status(400).json({ message: "Amount missing" });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: Math.round(Number(req.body.amount) * 100),
            currency: "INR",
            receipt: "rcpt_" + Date.now(),
        };

        const order = await instance.orders.create(options);
        console.log("Order created:", order.id);
        res.status(200).json(order);

    } catch (error) {
        console.log("RAZORPAY ERROR FULL:", error);
        // Asol error frontend e pathabo jate alert e dekhay
        res.status(500).json({ 
            message: error.error?.description || error.message || "Razorpay order failed" 
        });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');
            
        if (generated_signature === razorpay_signature) {
            res.status(200).json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Payment verification failed - signature mismatch" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error in verify" });
    }
};

module.exports = { createdOrder, verifyPayment };