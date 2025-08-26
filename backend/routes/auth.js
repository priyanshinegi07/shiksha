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
        const token = jwt.sign({
            id: newUser._id, role: newUser.role
        },
        process.env.SECRET,
        {expiresIn:"1h"}
        );
        res.status(201).json({ 
            message: "User registered successfully",
            token,
            role: newUser.role,
            id: newUser._id
         });

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

        res.json({ message: "Logged in successfully", token, role : user.role, id: user._id });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});
router.get("/verify-token", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ valid: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        res.json({ 
            valid: true, 
            role: decoded.role,  // ✅ send role directly
            user: decoded        // still send full user details if needed
        });
    } catch (err) {
        res.status(401).json({ valid: false, message: "Invalid or expired token" });
    }
});



module.exports = router;