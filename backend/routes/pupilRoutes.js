"use strict";
const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const {
	addPupil,
	findPupils,
	showPupil,
	addAssignment,
	deleteAssignment,
	deletePupil,
} = require("../controllers/PupilController");
const {
	isLoggedIn,
	userVerification,
} = require("../middleware/authMiddleware");
router.get("/", userVerification, findPupils);
router.delete("/", userVerification, deletePupil);
router.post("/add", userVerification, addPupil);
router.get("/:id", userVerification, showPupil);
router.put("/:id/add", userVerification, addAssignment);
router.delete("/:id/delete", userVerification, deleteAssignment);

module.exports = router;
