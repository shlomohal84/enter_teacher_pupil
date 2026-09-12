const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
	res.json({
		success: true,
		message: "Server is Running",
	});
});

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
