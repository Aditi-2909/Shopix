const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();
const app = express();

// FINAL CORS FIX
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin like mobile apps, curl
        if (!origin) return callback(null, true);
        if (
            origin.includes("localhost:5173") ||
            origin.includes("vercel.app") ||
            origin.includes("shopix")
        ) {
            callback(null, true);
        } else {
            callback(null, true); // sob allow kore dilam, pore chaile restrict koris
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get("/", (req, res) => {
    res.send("Shopix backend is running properly!");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});