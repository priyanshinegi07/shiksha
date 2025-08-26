// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Student = require("../models/student");
const Tutor = require("../models/Tutor");
const auth = require("../middlewares/auth");

router.delete("/users/me", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Delete user from Users collection
    await User.findByIdAndDelete(userId);

    // 2. Try deleting from Student collection first
    let user = await Student.findById(userId);
    if (user) {
      await Student.findByIdAndDelete(userId);
      return res.json({ message: "User and student profile deleted successfully" });
    }

    // 3. If not found in Student, try Tutor collection
    user = await Tutor.findById(userId);
    if (user) {
      await Tutor.findByIdAndDelete(userId);
      return res.json({ message: "User and tutor profile deleted successfully" });
    }

    // 4. If not found in either
    res.status(404).json({ message: "Profile not found in Student or Tutor collections" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account", error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  const userId = req.user.id;
  let user = await Student.findById(userId);
  let role = "student";

  if (!user) {
    user = await Tutor.findById(userId);
    role = "tutor";
  }

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    _id: user._id,
    role,
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
