const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn:'30d'});
};

const registerUser = async (req,res) =>{
    console.log("REGISTER DATA:", req.body);
    const{name,email,password }= req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({name,email,password:hashedPassword});
        if(user){
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message= `welcome to Shopix! Your OTP is ${otp}`;

           // await sendEmail(email,"welcome to shopix - your OTP for Registration",message);
           sendEmail(email,"welcome to shopix - your OTP for Registration",message).catch(err=> console.log(err));

            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id),
                //message:"User registered successfully. OTP sent to email"
            });
        }
        else{
            res.status(400).json({message:"Invalid user data"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};

// login user
const loginUser = async(req,res) =>{
    const{email,password}= req.body;
    try{
      const user = await User.findOne({email});
      if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        });

      }
      else{
        res.status(400).json({message:"Invalid email or password"});
      }
    }catch(error){
        res.status(500).json({message:" server error"});
    }
};
 const getUsers = async(req,res) =>{
    try{
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
 };
 module.exports= {
    registerUser,
    loginUser,
    getUsers
 };