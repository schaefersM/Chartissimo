const jwt = require("jsonwebtoken");
const router = require("express").Router();
const RefreshToken = require("../model/RefreshToken");
const User = require("../model/User");
const verify = require("../middleware/verifyToken");

router.use(verify);

router.route("/").post(async (req, res) => {
	try {
		const accessToken = req.cookies.accesscookie;
		const refreshToken = req.cookies.refreshcookie;
		if (!accessToken) {
			return null;
		}
		const {
			user: { name },
		} = jwt.decode(accessToken);
		const user = await User.findOne({ name });
		await RefreshToken.deleteMany({ user: user._id });
		console.log(`${user.name} wird ausgeloggt`);
		res.cookie("accesscookie", accessToken, {
			maxAge: 0,
			httpOnly: true,
		});
		res.cookie("refreshcookie", refreshToken, {
			maxAge: 0,
			httpOnly: true,
		});
		res.sendStatus(200);
	} catch (e) {
		res.sendStatus(403);
		console.log(e);
	}
});

module.exports = router;
