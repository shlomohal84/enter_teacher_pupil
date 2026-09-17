const mongoose = require("mongoose");

const PupilSchema = new mongoose.Schema({
	idNum: {
		type: String,
		unique: true,
		required: true,
		cast: false,
	},
	fullName: {
		type: String,
		required: true,
	},
	grades: [
		{
			cSharp: { type: Number, required: true },
			fullStack: { type: Number, required: true },
			finalProject: { type: Number, required: true },
			_id: false,
		},
	],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});
module.exports = mongoose.model("Pupil", PupilSchema);
