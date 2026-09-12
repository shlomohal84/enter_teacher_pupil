const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
const authMiddleware = require("../middleware/auth");

// Register User
router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();
		res.status(201).json({ message: `User ${name} registered successfully!` });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Login User
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(400)
				.json({ message: `User with email ${email} not found` });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });
		const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
		res.json({ token, userId: user._id });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
