const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
//const userRoutes = require('./routes/authRoutes');
dotenv.config();


connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) => {
    res.send("shopix Backend is working properly!");
});

app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT ||5000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});