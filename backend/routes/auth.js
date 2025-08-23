const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    try{
        console.log("hello");
        console.log(req.body)
        const {name, email, password, role} = req.body;
        const newUser = new User({name, email, password, role: role.toLowerCase()});
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: err.message, stack:err.stack });
    }
})

router.post("/login", async (req, res) => {
    try {
        console.log(Object.keys(req.body));
        console.log(req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET, // replace with env variable
            { expiresIn: "1h" }
        );

        res.json({ message: "Logged in successfully", token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;