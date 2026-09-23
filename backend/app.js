const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const pupilRoutes = require("./routes/pupilRoutes");
const {
	handlePreflight,
	configureCors,
} = require("#middleware/corsMiddleware.js");

morgan.token("timestamp", (req, res) => {
	return new Date().toLocaleString();
});
app.use(morgan(":timestamp { :method :url :status } [:response-time ms]"));

app.use(express.json());
app.use(cookieParser());

app.use(handlePreflight); // 1. Catches and resolves OPTIONS requests immediately
app.use(configureCors); // 2. Validates normal application traffic headers

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("/health", (req, res) => {
	return res.json({
		success: true,
		message: "Server is Running",
	});
});

app.use("/auth", authRoutes);

app.use("/pupils", pupilRoutes);

module.exports = app;
