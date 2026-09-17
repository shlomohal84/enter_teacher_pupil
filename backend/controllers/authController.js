const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const { createSecretToken } = require("../utils/secretToken");
const jwtSecret = process.env.JWT_SECRET;

// Register User
module.exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({ message: "User already exists" });
		}

		const user = await User.create({ name, email, password });
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		return res.status(201).json({
			message: "User registered successfully",
			success: true,
			user,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: error.message });
	}
};

// Login User

module.exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({ message: "All fields are required" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ message: "Incorrect email or password" });
		}
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res.json({ message: "Incorrect email or password" });
		}
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
			path: "/",
		});
		return res.status(201).json({
			message: "User logged in successfully",
			success: true,
			user: user.name,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};
module.exports.verifySession = (req, res) => {
	return res.json({ status: true, user: req.user.name });
};

module.exports.logout = (req, res) => {
	res.clearCookie("token", {
		path: "/",
		withCredentials: true,
	});
	console.log("Logged out successfully");
	return res.json({ status: true, message: "Logged out successfully" });
};
// router.post("/login", async (req, res) => {
// 	try {
// 		const { email, password } = req.body;
// 		const user = await User.findOne({ email });
// 		if (!user)
// 			return res
// 				.status(400)
// 				.json({ message: `User with email ${email} not found` });
// 		const isMatch = await bcrypt.compare(password, user.password);
// 		if (!isMatch)
// 			return res.status(400).json({ message: "Invalid credentials" });
// 		const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
// 		console.log("Logged in successfully!");
// 		return res.json({
// 			token,
// 			userId: user._id,
// 			message: "Logged in successfully!",
// 		});
// 	} catch (error) {
// 		console.error(error.message);
// 		return res.status(500).json({ error: error.message });
// 	}
// });
