const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const User = require("#models/User.js");

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
	const token = req.cookies.token;
	if (!token) {
		return res.json({ status: false });
	}
	jwt.verify(token, jwtSecret, async (err, data) => {
		try {
			const user = await User.findById(data.id);
			if (user) {
				req.user = user;
				return next();
			} else {
				return res.json({ status: false, message: "User not found" });
			}
		} catch (error) {
			return next(error);
		}
	});
};

// module.exports.userVerification = (req, res) => {
// 	const token = req.cookies.token;
// 	if (!token) {
// 		return res.json({ status: false });
// 	}
// 	jwt.verify(token, jwtSecret, async (err, data) => {
// 		if (err) {
// 			return res.json({ status: false });
// 		} else {
// 			const user = await User.findById(data.id);
// 			if (user) {
// 				return res.json({ status: true, user: user.name });
// 			} else {
// 				return res.json({ status: false });
// 			}
// 		}
// 	});
// };
// // module.exports = (req, res, next) => {
// // 	const token = req.header("authorization");
// // 	if (!token) return res.status(401).json({ message: "Accesss denied" });
// // 	try {
// // 		const decoded = jwt.verify(token, jwtSecret);
// // 		req.user = decoded;
// // 		next();
// // 	} catch (error) {
// // 		res.status(400).json({ message: "Invalid token" });
// // 	}
// // };
