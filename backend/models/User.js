const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Your name is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email address is required"],
			unique: true,
			lowercase: true,
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
