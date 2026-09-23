"use strict";

const router = require("express").Router();
const {
	verifySession,
	logout,
	register,
	login,
} = require("#controllers/authController.js");
const { userVerification } = require("#middleware/authMiddleware.js");

router.get("/verify-session", userVerification, verifySession);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
