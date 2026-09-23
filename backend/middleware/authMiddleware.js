const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const User = require("#models/User.js");

const handleJwtVerification = (req, res, next) => {
	return async (err, data) => {
		if (err)
			return res
				.status(401)
				.json({ status: false, message: "Token expired or invalid" });
		try {
			const user = await User.findById(data.id).select("-password");
			if (user) {
				req.user = user;
				// Direct handshake response for React initial load
				if (req.path === "/verify" || req.path === "me") {
					return res.status(200).json({ status: true, user: user.name });
				}
				return next();
			} else {
				return res
					.status(400)
					.json({ status: false, message: "User not found" });
			}
		} catch (error) {
			return res
				.status(500)
				.json({ status: false, message: "Internal server error" });
		}
	};
};

module.exports.isLoggedIn = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res
			.status(401)
			.json({ status: false, message: "Unauthorized: No token provided" });
	}
	jwt.verify(token, jwtSecret, async (err, data) => {
		if (err) {
			return res
				.status(403)
				.json({ status: false, message: "Forbidden: Invalid token" });
		}
		try {
			const user = await User.findById(data.id);
			if (!user) {
				return res
					.status(404)
					.json({ status: false, message: "User not found" });
			}
			req.user = user;
			next();
		} catch (error) {
			next(error);
		}
	});
};

module.exports.userVerification = (req, res, next) => {
	const token = req.cookies?.token;
	if (!token) {
		return res
			.status(401)
			.json({ status: false, message: "No session token found" });
	}
	// Pass the separated callback variable into the third argument slot
	const verificationCallback = handleJwtVerification(req, res, next);
	jwt.verify(token, jwtSecret, verificationCallback);
};
