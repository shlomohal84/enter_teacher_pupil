"use strict";
const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const { addPupil, findPupils } = require("../controllers/PupilController");
const { isLoggedIn } = require("../middleware/authMiddleware");
router.post("/", isLoggedIn, findPupils);
router.post("/add", isLoggedIn, addPupil);

module.exports = router;
