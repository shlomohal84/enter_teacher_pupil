"use strict";
const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const {
	addPupil,
	findPupils,
	showPupil,
	addAssignment,
} = require("../controllers/PupilController");
const {
	isLoggedIn,
	userVerification,
} = require("../middleware/authMiddleware");
router.get("/", userVerification, findPupils);
router.post("/add", userVerification, addPupil);
router.get("/:id", userVerification, showPupil);
router.post("/:id/add", userVerification, addAssignment);
module.exports = router;
