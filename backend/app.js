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

app.use(handlePreflight); // 1. Catches and resolves OPTIONS requests immediately
app.use(configureCors); // 2. Validates normal application traffic headers

// app.use(
// 	cors({
// 		origin: function (origin, callback) {
// 			// Allow requests with no origin (like Postman or mobile apps)
// 			if (!origin) return callback(null, true);

// 			// Allow if origin matches our list OR belongs to your personal Vercel deployment sub-domains
// 			if (
// 				allowedOrigins.indexOf(origin) !== -1 ||
// 				origin.endsWith(".vercel.app")
// 			) {
// 				return callback(null, true);
// 			} else {
// 				return callback(new Error("Not allowed by CORS"));
// 			}
// 		},
// 		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// 		credentials: true,
// 	}),
// );

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

app.use("/pupils", pupilRoutes);

module.exports = app;
