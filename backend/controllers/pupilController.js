const User = require("../models/User");
const Pupil = require("../models/Pupil");

module.exports.addPupil = async (req, res) => {
	try {
		const { idNum, fullName, grades, userId } = req.body;
		// console.log(userId);
		const user = await User.findOne({ _id: userId });
		console.log(user._id);
		const pupil = await Pupil.create({
			idNum: idNum,
			fullName: fullName,
			grades: grades,
			userId: user._id,
		});
		// console.log(pupil);
		return res
			.status(200)
			.json({ message: "Pupil added successfully", pupil: pupil });
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({ message: error.message });
	}
};

module.exports.findPupils = async (req, res) => {
	try {
		const { userId } = req.body;
		console.log(req.body);
		const pupils = await Pupil.find({ userId });
		console.log(pupils);
		return res.status(200).json({ message: "Loaded successfully", pupils });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error.message });
	}
};
// 	const user = new User({
// 		name: "John Doe",
// 		password: "1234",
// 		email: "john@doe.com",
// 	});

// 	const validateUser = async (user) => {
// 		const error = await user.validate();
// 		if (!error) {
// 			console.log("Valid");
// 		} else {
// 			console.log(error.errors);
// 		}
// 	};

// 	const p1 = new Pupil({
// 		idNum: "1234",
// 		fullName: "Shlomo Halperin",
// 		grades: {
// 			cSharp: 72,
// 			fullStack: 100,
// 			finalProject: 100,
// 		},
// 		user: user._id,
// 	});
// 	const p2 = new Pupil({
// 		idNum: "000",
// 		fullName: "Chris Christopherson",
// 		grades: {
// 			cSharp: 88,
// 			fullStack: 99,
// 			finalProject: 77,
// 		},
// 		user: user._id,
// 	});

// 	const validatePupil = async (p) => {
// 		const error = await p.validate();
// 		if (!error) {
// 			console.log("Valid");
// 		} else {
// 			console.log(error.errors);
// 		}
// 	};

// 	const pupils = [p1, p2];

// 	const getPupilsByUser = async (userId) => {
// 		try {
// 			const p = await pupils.find({ user: userId });
// 			return p;
// 		} catch (error) {
// 			console.error("Error fetching pupils:");
// 			throw error;
// 		}
// 	};
// 	// console.log(p1);
// 	// console.log(p2);
// 	// const p = await getPupilsByUser();
// 	// console.log(p);
// 	getPupilsByUser(user._id);
// 	return res.status(200).json({ message: p || "" });
// } catch (error) {
// 	console.log(error.error);
// 	return res.status(400).json({ message: error.error });
// }
// getPupilsByUser(user._id)
// 	.then((p) => console.log(p))
// 	.catch((error) => {
// 		console.error("Execution failed:", error);
// 	});
