const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

const PupilSchema = new mongoose.Schema(
	{
		idNum: {
			type: String,
			unique: true,
			required: true,
			match: [/^\d+$/, "The value can contain only numerals (0-9)."],
		},
		fullName: {
			type: String,
			required: true,
		},
		assignments: {
			type: [AssignmentSchema],
			default: () => [],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);
module.exports = mongoose.model("Pupil", PupilSchema);
