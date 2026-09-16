const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

morgan.token("timestamp", (req, res) => {
	return new Date().toLocaleString();
});
app.use(morgan(":timestamp { :method :url :status } [:response-time ms]"));
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.use(cookieParser());

app.get("/health", (req, res) => {
	return res.json({
		success: true,
		message: "Server is Running",
	});
});

app.use("/", authRoutes);
app.use("/auth", authRoutes);

module.exports = app;

// require("dotenv").config();
// require("morgan");
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors());

// const backendPort = process.env.BACKEND_PORT || 5000;
// const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
// mongoose
// 	.connect(mongoURI)
// 	.then(() => console.log(`Connected to MongoDB on ${mongoURI}`))
// 	.catch((err) => console.log(err));

// app.listen(backendPort, () =>
// 	console.log(`Server is running on port http://localhost:${backendPort}`),
// );
