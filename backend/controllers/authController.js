const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { createSecretToken } = require("../utils/secretToken");

// Register User
module.exports.register = async (req, res) => {
	try {
		const { idNum, name, password } = req.body;
		const existingUser = await User.findOne({ idNum });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = await User.create({ name, idNum, password });
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			httpOnly: true,
			path: "/",
			sameSite: "none",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		return res.status(201).json({
			message: "User registered successfully",
			success: true,
			user: user.name,
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
			return res.status(400).json({ message: "All fields are required" });
		}
		const user = await User.findOne({ idNum });
		if (!user) {
			return res
				.status(401)
				.json({ message: "Incorrect ID number or password" });
		}
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res
				.status(401)
				.json({ message: "Incorrect ID number or password" });
		}
		const token = createSecretToken(user._id);

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
module.exports.verifySession = async (req, res) => {
	try {
		return res.json({ status: true, user: req.user.name });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

module.exports.logout = async (req, res) => {
	try {
		res.clearCookie("token", {
			path: "/",
			sameSite: "none",
			secure: true,
			httpOnly: true,
		});
		console.log("Logged out successfully");
		return res.json({ status: true, message: "Logged out successfully" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};
