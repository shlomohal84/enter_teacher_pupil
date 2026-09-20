const mongoose = require("mongoose");

// const gradeSchema = new mongoose.Schema(
// 	{
// 		cSharp: { type: Number, required: true, min: 0, max: 100 },
// 		fullstack: { type: Number, required: true, min: 0, max: 100 },
// 		finalProject: { type: Number, required: true, min: 0, max: 100 },
// 	},
// 	{ _id: false },
// );
const PupilSchema = new mongoose.Schema(
	{
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
		assignments: {
			type: [String],
			default: () => [],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		// grades: {
		// 	type: [gradeSchema],
		// 	required: true,
		// 	validate: {
		// 		validator: (v) => {
		// 			return Array.isArray(v) && v.length > 0;
		// 		},
		// 		message:
		// 			"Grades array cannot be empty. You must provide at least one grade object",
		// 	},
		// },
	},
	{ timestamps: true },
);
module.exports = mongoose.model("Pupil", PupilSchema);
