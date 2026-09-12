require("dotenv").config();
const cors = require("cors");
require("morgan");
const app = require("./app");
const connectDB = require("./config/database");
const PORT = process.env.PORT || 5000;

app.use(cors());
const authRouters = require("./routes/auth");
const startServer = async () => {
	await connectDB();

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
};

startServer();

app.use("/auth", authRouters);
