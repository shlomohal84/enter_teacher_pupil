"use strict";
const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const {
	addPupil,
	findPupils,
	showPupil,
} = require("../controllers/PupilController");
const {
	isLoggedIn,
	userVerification,
} = require("../middleware/authMiddleware");
router.get("/", userVerification, findPupils);
router.get("/:id", userVerification, showPupil);
router.post("/add", userVerification, addPupil);

module.exports = router;
