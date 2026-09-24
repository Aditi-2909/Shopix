const Razorpay = require("razorpay");
const crypto = require("crypto");
dotenv = require("dotenv").config();

const createOrder = async(req , res) =>{
    try{
        const instance = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        });
        const options ={
            amount :req.body.amount * 100,
            currency:"INR",
            receipt:crypto.randomBytes(10).tostring("hex"),

        };
        const order = await instance.orders.create(options);
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message:"server error"});
    };
    
};

// const verifyPayment = async (req,res) =>{
//     try{
//         const{razorpay_order_id,razorpay_payment_id}
//     }
// }
