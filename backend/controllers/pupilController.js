const User = require("../models/User");
const Pupil = require("../models/Pupil");

module.exports.addPupil = async (req, res) => {
	try {
		const { idNum, fullName } = req.body;
		const findUser = await User.findOne({ _id: req.user._id });
		if (!findUser) {
			console.log("User not found");
			return res.status(404).json({ message: "User not found" });
		}

		const existingPupil = await Pupil.findOne({ idNum: idNum });
		if (existingPupil) {
			return res
				.status(400)
				.json({ message: `A pupil with ID Number ${idNum} already exists.` });
		}
		const pupil = await Pupil.create({
			idNum: idNum,
			fullName: fullName,
			user: req.user._id,
		});
		return res
			.status(200)
			.json({ message: "Pupil added successfully", pupil: pupil });
	} catch (error) {
		const cleanMessage =
			Object.values(error.errors || {}).message || error.message;
		return res.status(400).json({ message: cleanMessage });
	}
};

module.exports.findPupils = async (req, res) => {
	try {
		const pupils = await Pupil.find({ user: req.user._id }).populate(
			"user",
			"name",
		);

		if (!pupils.length) {
			console.log("No pupils found");
			return res.status(200).json({ message: "No pupils found", pupils: [] });
		}
		return res
			.status(200)
			.json({ message: "Loaded successfully", count: pupils.length, pupils });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: error.message });
	}
};

module.exports.showPupil = async (req, res) => {
	const { params } = req;
	try {
		const pupil = await Pupil.findOne({ _id: params.id });
		return res.status(200).json({ message: pupil });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error.message });
	}
};

module.exports.addAssignment = async (req, res) => {
	try {
		const { id } = req.params;
		const { title } = req.body;
		const pupil = await Pupil.findOne({ _id: id });
		if (!pupil) {
			return res.status(404).json({ message: "Pupil not found" });
		}
		pupil.assignments.push({ title: title });
		await pupil.save();
		const newAssignment = pupil.assignments[pupil.assignments.length - 1];

		return res.status(200).json({
			message: "Added assignment successfully",
			newAssignment,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error.message });
	}
};

module.exports.deleteAssignment = async (req, res) => {
	try {
		const { assignmentId } = req.body;
		console.log(req.body);
		const pupilId = req.params.id;

		const pupil = await Pupil.findOne({ _id: pupilId });
		if (!pupil) return res.status(404).json({ message: "Pupil not found" });

		const hasAssignment = pupil.assignments.some(
			(assignment) => assignment._id.toString() === assignmentId,
		);
		if (!hasAssignment) {
			return res.status(404).json({ message: "Assignment not found" });
		}

		pupil.assignments.pull({ _id: assignmentId });
		await pupil.save();

		return res.json({
			message: "Deleting...",
			assignmentId: assignmentId,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error.message });
	}
};
