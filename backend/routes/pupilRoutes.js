"use strict";
const router = require("express").Router();
const { addPupil, findPupils } = require("../controllers/PupilController");
router.post("", findPupils);
router.post("/add", addPupil);

module.exports = router;
