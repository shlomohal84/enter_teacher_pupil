const User = require("../models/User");
const Pupil = require("../models/Pupil");

module.exports.addPupil = async (req, res) => {
	try {
		const { idNum, fullName, grades } = req.body;
		console.log(req.body);
		const findUser = await User.findOne({ _id: req.user._id });
		if (!findUser) {
			console.log("User not found");
			return res.status(404).json({ message: "User not found" });
		}
		const pupil = await Pupil.create({
			idNum: idNum,
			fullName: fullName,
			grades: grades,
			user: req.user._id,
		});
		return res
			.status(200)
			.json({ message: "Pupil added successfully", pupil: pupil });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error });
	}
};

module.exports.findPupils = async (req, res) => {
	try {
		const pupils = await Pupil.find({ user: req.user._id }).populate(
			"user",
			"name",
		);
		console.log(pupils);
		if (!pupils) {
			console.log("No pupils found");
			return res.status(404).json({ message: "No pupils found" });
		}
		return res
			.status(200)
			.json({ message: "Loaded successfully", count: pupils.length, pupils });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

module.exports.showPupil = async (req, res) => {
	const { params } = req;
	try {
		const pupil = await Pupil.findOne({ _id: params.id });
		console.log(pupil);
		return res.status(200).json({ message: pupil });
	} catch (error) {
		console.log(error);
		return res.status(400).json(error.message);
	}
};
