const router = require("express").Router({ mergeParams: true });
const UserConfig = require("../model/UserConfig");
const verify = require("../verifyToken");

router.use(verify);

router
	.route("/")
	.get(async (req, res) => {
		const { user_id } = req.params;
		try {
			const userConfig = await UserConfig.findOne({ user: user_id });
			if (userConfig) {
				console.log(`searched user config of user ${user_id}`);
				res.status(200).send(userConfig.config);
			} else {
				console.log(`no User config for ${user_id} found`);
				res.status(404).send("No user config found.");
			}
		} catch (error) {
			console.log(error);
		}
	})
	.post(async (req, res) => {
		const { user_id } = req.params;
		const { config } = req.body;
		try {
			const userConfig = await UserConfig.findOne({ user: user_id });
			if (userConfig) {
				const { _id } = userConfig;
				await UserConfig.updateOne(
					{
						_id,
					},
					{
						config,
					}
				);
				res.status(200).send(userConfig.config);
				console.log(`updated User Config of user ${user_id}`);
			} else {
				const userConfig = new UserConfig({
					user: user_id,
					config,
				});
				await userConfig.save();
				console.log(`created User Config for user ${user_id}`);
				res.status(200).send(userConfig.config);
			}
		} catch (error) {
			console.log(error);
		}
	});

module.exports = router;
