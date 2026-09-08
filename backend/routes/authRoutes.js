const express = require("express");
const router = express.Router();
const{registerUser , loginUser,getUsers}= require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");



router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/users", protect,admin,getUsers);

module.exports = router;