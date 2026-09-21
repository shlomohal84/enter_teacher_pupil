const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
	{
		idNum: {
			type: String,
			required: [true, "ID Number is required"],
			unique: true,
			match: [/^\d+$/, "The value can contain only numerals (0-9)."],
		},
		name: {
			type: String,
			required: [true, "Your name is required"],
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
	},
	{ timestamps: true },
);

UserSchema.pre("save", async function () {
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
