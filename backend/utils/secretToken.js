const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports.createSecretToken = (id) => {
	return jwt.sign({ id }, jwtSecret, {
		expiresIn: 3 * 24 * 60 * 60 * 1000,
	});
};
