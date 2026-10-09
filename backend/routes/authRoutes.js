const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUsers } = require("../controllers/authController");
const { admin } = require("../middleware/adminMiddleware");

// ✅ Eta important - User model import
const User = require("../model/User"); // Jodi error dey tahole "../models/userModel" likhbi

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);

// ✅ Permanent Name Update - /api/auth/profile
router.put("/profile", protect, async (req, res) => {
  try {
    // protect middleware theke user id asbe
    const userId = req.user._id || req.user.id;
    console.log("Updating user id:", userId, "New name:", req.body.name);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name.trim();
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;