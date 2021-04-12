const jwt = require("jsonwebtoken");
const router = require("express").Router();
const RefreshToken = require("../model/RefreshToken");
const User = require("../model/User");

router.route("/").post(async (req, res) => {
	try {
		const currentRefreshtoken = req.cookies.refreshcookie;
		if (!currentRefreshtoken) {
			console.log("No cookie sent");
			return res.status(403).send();
		}
		jwt.verify(currentRefreshtoken, process.env.REFRESH_TOKEN_SECRET);
		const ipAddress = req.ip;
		const { user: decodedUser } = jwt.decode(currentRefreshtoken);
		console.log(`${decodedUser.name} refreshes his token`);
		const refreshToken = await RefreshToken.findOne({
			token: currentRefreshtoken,
		});
		if (!refreshToken) {
			console.log("Token not in database. User is logged out");
			return res.status(403).send();
		} else if (refreshToken.isExpired) {
			console.log("Token is expired. Delete old token");
			try {
				await RefreshToken.deleteOne({ currentRefreshtoken });
			} catch {
				console.log("error");
			}
			console.log("Creating new token...");
			const accessToken = jwt.sign(
				{ user: decodedUser },
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "7d",
				}
			);
			const refreshToken = jwt.sign(
				{ user: decodedUser },
				process.env.REFRESH_TOKEN_SECRET,
				{
					expiresIn: "7d",
				}
			);
			res.cookie("accesscookie", accessToken, {
				maxAge: 90000000,
				httpOnly: true,
			});
			res.cookie("refreshcookie", refreshToken, {
				maxAge: 90000000,
				httpOnly: true,
			});
			const newRefreshToken = new RefreshToken({
				user: decodedUser.id,
				token: refreshToken,
				expires: new Date(Date.now() + 90000000),
				createdByIp: ipAddress,
			});
			await newRefreshToken.save();
			console.log("Saving new token in the database");
			const { _id, name, email } = decodedUser;
			return res.status(200).json({
				isAuthenticated: true,
				user: { user_id: _id, name, email },
			});
		} else {
			const user = await User.findOne({ name: decodedUser.name });
			if (user) {
				const { _id, name, email } = user;
				return res.status(200).json({
					isAuthenticated: true,
					user: { user_id: _id, name, email },
				});
			} else {
				console.log("No user found");
			}
			console.log(
				"----------------------------------------------------------"
			);
		}
	} catch (e) {
		res.sendStatus(500);
		console.log(e);
	}
});

module.exports = router;
