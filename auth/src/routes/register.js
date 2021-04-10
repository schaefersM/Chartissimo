const bcrypt = require("bcryptjs");
const router = require("express").Router();
const registerSchema = require("../validation/registerSchema");
const User = require("../model/User");
const validation = require("../middleware/validation");

router.use(validation(registerSchema));

router.post("/", async (req, res) => {
	//Checking if the user is already in the database
	const emailExists = await User.findOne({ email: req.body.email });
	if (emailExists) {
		console.log("Email already exists");
		return res.status(400).json({ errorMessage: "Email already exists" });
	}

	const nameExists = await User.findOne({ name: req.body.name });
	if (nameExists) {
		return res.status(400).json({ errorMessage: "Name already in use" });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});
	try {
		console.log(
			`Register ${user.name} authenticated by the password ${user.password} \n
      Contact him on ${user.email}`
		);
		const savedUser = await user.save();
		console.log(savedUser);
		res.send(savedUser);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

module.exports = router;
