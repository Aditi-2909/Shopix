const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUsers, sendOtp } = require("../controllers/authController");
const { admin } = require("../middleware/adminMiddleware");
const User = require("../model/User");

router.post("/send-otp", sendOtp); // NEW
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);

router.put("/profile", protect, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = req.body.name.trim();
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;