const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const User = require("../models/User");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);   // Register User
router.post("/login", loginUser);         // Login User
router.get("/profile", protect, getUserProfile);  // Get User Profile
router.put("/profile", protect, updateUserProfile); // Update Profile

router.post("/upload-image", protect, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Find the user and update their profileImageUrl
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Construct the URL for the uploaded image
    const imageUrl = `uploads/${req.file.filename}`;

    // Update the user's profile image URL
    user.profileImageUrl = imageUrl;
    await user.save();

    // Prepend the base URL for the response
    const fullImageUrl = `${req.protocol}://${req.get("host")}/${imageUrl}`;

    res.status(200).json({ ...user.toObject(), profileImageUrl: fullImageUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
