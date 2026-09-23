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
		const { idNum, name, password } = req.body;
		const existingUser = await User.findOne({ idNum });
		if (existingUser) {
			return res.json({ message: "User already exists" });
		}

		const user = await User.create({ name, idNum, password });
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
		const { idNum, password } = req.body;
		if (!idNum || !password) {
			return res.json({ message: "All fields are required" });
		}
		const user = await User.findOne({ idNum });
		if (!user) {
			return res.json({ message: "Incorrect ID number or password" });
		}
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res.json({ message: "Incorrect ID number or password" });
		}
		const token = createSecretToken(user._id);

		const isLocalhost =
			req.headers.origin?.includes("localhost") ||
			req.headers.referer?.includes("localhost");

		res.cookie("token", token, {
			httpOnly: true,
			path: "/",
			sameSite: "none",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
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
