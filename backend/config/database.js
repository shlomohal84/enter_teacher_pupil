const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/school";

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log(`Connected to MongoDB on ${MONGO_URI}`);
	} catch (error) {
		console.error("MongoDB connection failed", error);
		process.exit(1);
	}
};

module.exports = connectDB;
