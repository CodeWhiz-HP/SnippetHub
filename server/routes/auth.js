const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AuthMiddleware = require("../middleware/auth")

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";


router.post("/register", async (req,res) => {
    const { name , email , password } = req.body;
    const hash = await bcrypt.hash(password,10);
    const user = new User({ name , email , password: hash });
    await user.save();
    res.status(201).json({ message: "User Registered" });

});

router.post("/login" , async (req,res) => {
    const { email , password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: "Invalid Email/Password !" });
    
    const pass = await bcrypt.compare(password , user.password);
    if(!pass) return res.status(400).json({ message: "Invalid Email/Password !" });

    const token = jwt.sign( {id: user._id} , JWT_SECRET , { expiresIn: "7d" } );
    res.json({token , user: {id: user._id , name: user.name , email: user.email}});

});


router.get("/me", AuthMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;