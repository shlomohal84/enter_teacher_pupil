"use strict";

const router = require("express").Router();
const {
	verifySession,
	logout,
	register,
	login,
} = require("#controllers/authController.js");
const { userVerification } = require("#middleware/authMiddleware.js");

router.post("/verify-session", userVerification, verifySession);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;

// // Login User
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
