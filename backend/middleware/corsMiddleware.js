const cors = require("cors");

const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:4173",
	"http://localhost:5000",
	"https://onrender.com",
];

// Helper function to check if the incoming origin is allowed
const checkOrigin = (origin) => {
	if (!origin) return true;
	return allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");
};

// 1. The early-exit Preflight interceptor function
const handlePreflight = (req, res, next) => {
	const origin = req.headers.origin;

	if (checkOrigin(origin) && origin) {
		res.header("Access-Control-Allow-Origin", origin);
		res.header("Access-Control-Allow-Credentials", "true");
		res.header(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS",
		);
		res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

		// Catch preflight checks immediately and prevent them from hit routing or redirects
		if (req.method === "OPTIONS") {
			return res.sendStatus(200);
		}
	}
	next();
};

// 2. Standard CORS configurations for normal app data traffic
const configureCors = cors({
	origin: function (origin, callback) {
		if (checkOrigin(origin)) {
			return callback(null, true);
		} else {
			return callback(new Error("Not allowed by CORS"));
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	credentials: true,
});

// Export both configurations to be used sequentially in your server setup
module.exports = {
	handlePreflight,
	configureCors,
};
