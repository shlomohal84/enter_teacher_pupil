const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
	const token = req.header("authorization");
	if (!token) return res.status(401).json({ message: "Accesss denied" });
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).json({ message: "Invalid token" });
	}
};
