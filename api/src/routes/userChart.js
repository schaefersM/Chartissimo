const jwt = require("jsonwebtoken");
const router = require("express").Router({ mergeParams: true });
const UserChart = require("../model/UserChart");

function navigationLinks() {
	return async (req, res, next) => {
		try {
			const limit = parseInt(req.query.limit);
			const page = parseInt(req.query.page);
			const baseUrl = req.baseUrl;
			const lastPageIndex = Math.ceil(res.amountOfDocuments / limit);
			const navigationLinks = {
				lastPageIndex: lastPageIndex !== page ? lastPageIndex : page,
				self: {
					href: `http://${process.env.DOCKER_HOST}:${process.env.SERVER_PORT}${baseUrl}?page=${page}&limit=${limit}`,
				},
				first:
					page !== 1
						? {
								href: `http://${process.env.DOCKER_HOST}:${process.env.SERVER_PORT}${baseUrl}?page=1&limit=${limit}`,
						  }
						: undefined,
				prev:
					page !== 1
						? {
								href: `http://${process.env.DOCKER_HOST}:${
									process.env.SERVER_PORT
								}${baseUrl}?page=${page - 1}&limit=${limit}`,
						  }
						: undefined,
				next:
					lastPageIndex !== page
						? {
								href: `http://${process.env.DOCKER_HOST}:${
									process.env.SERVER_PORT
								}${baseUrl}?page=${page + 1}&limit=${limit}`,
						  }
						: undefined,
				last:
					!this.next && lastPageIndex !== page
						? {
								href: `http://${process.env.DOCKER_HOST}:${process.env.SERVER_PORT}${baseUrl}?page=${lastPageIndex}&limit=${limit}`,
						  }
						: undefined,
			};
			res.data = {
				results: res.results,
				links: navigationLinks,
			};
			next();
		} catch (e) {
			console.log(e);
			res.status(500).json({ errorMessage: "Error Occured" });
		}
	};
}

function paginatedResults() {
	return async (req, res, next) => {
		const { user_id } = req.params;
		let { location, type, limit, page, ...rest } = req.query;
		limit = parseInt(limit);
		page = parseInt(page);
		const filter = {
			user: user_id,
			...rest,
		};
		location ? (filter.hosts = { $in: location }) : null;
		type ? (filter.chartType = { $in: type }) : null;
		const skipIndex = (page - 1) * limit;
		try {
			const results = await UserChart.find(filter)
				.sort({ _id: 1 })
				.limit(limit)
				.skip(skipIndex)
				.exec();
			const amountOfDocuments = await UserChart.find(filter).countDocuments();
			if (results.length) {
				res.results = results
				res.amountOfDocuments = amountOfDocuments
				next();
			} else {
				return res.status(404).json({ errorMessage: "No data available"})
			}
		} catch (e) {
			console.log(e);
			res.status(500).json({ errorMessage: "Error Occured" });
		}
	};
}

router
	.route("/")
	.get(paginatedResults(), navigationLinks(), (req, res, next) => {
		return res.json(res.data);
	})
	.post(async (req, res) => {
		const { user_id } = req.params;
		const {
			name,
			id,
			data,
			hosts,
			chartType,
			customOptions,
			image,
		} = req.body;
		try {
			const checkName = await UserChart.findOne({ user: user_id, name });
			if (checkName) {
				console.log(`${name} was already taken`);
				return res
					.status(400)
					.json({ errorMessage: "Name was already taken" });
			} else {
				const userChart = new UserChart({
					user: user_id,
					name,
					id,
					data,
					hosts,
					chartType,
					customOptions,
					image,
					createdAt: new Date(),
					lastModified: new Date(),
				});
				await userChart.save();
				console.log(`created user chart for ${user_id} named ${name}`);
			}
			return res.status(200).send();
		} catch (error) {
			console.log(error);
		}
	});

router.route("/names").get(async (req, res) => {
	const { user_id } = req.params;
	try {
		const chartNames = await UserChart.find(
			{ user: user_id },
			{ name: 1, _id: 0 }
		);
		res.data = {
			chartNames,
		};
		return res.json(res.data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ errorMessage: "Error Occured" });
	}
});

router
	.route("/:id")
	.get(async (req, res) => {
		const currentRefreshtoken = req.cookies.refreshcookie;
		const verifiedToken = jwt.verify(
			currentRefreshtoken,
			process.env.REFRESH_TOKEN_SECRET
		);
		const { _id } = verifiedToken.user;
		const { user_id, id } = req.params;
		if (_id !== user_id) {
			return res.status(403).json({ errorMessage: "Invalid Token" });
		}

		try {
			const singleUserChart = await UserChart.findOne(
				{ user: user_id, id },
				{ image: 0 }
			);
			if (singleUserChart) {
				res.data = singleUserChart;
				return res.status(200).json(res.data);
			}
			return res.status(404).json({ errorMessage: "No data available" });
		} catch (e) {
			console.log(e);
			res.status(500).json({ errorMessage: "Error Occured" });
		}
	})
	.put(async (req, res) => {
		const { user_id, id } = req.params;
		const {
			name,
			hosts,
			image,
			data,
			customOptions,
		} = req.body;
		try {
			const checkForUpdateName = await UserChart.findOne({
				user: user_id,
				name,
				id,
			});
			if (checkForUpdateName) {
				await UserChart.updateOne(
					{
						id,
						user: user_id,
					},
					{
						name,
						image,
						data,
						// $set: {
							// 	"data.defaultGraphNames": defaultGraphNames,
							// 	"data.customGraphNames": customGraphNames,
							// 	"data.colorIds": colorIds,
							// },
						customOptions,
						hosts,
						lastModified: new Date(),
					}
				);
				console.log(
					`Found chart and updated chart ${name} of user ${user_id}`
				);
			} else {
				const checkName = await UserChart.findOne({
					user: user_id,
					name,
				});
				if (checkName) {
					console.log(`chartname ${name} was already taken`);
					res.status(400).json({ errorMessage: "Name was already taken" });
				} else {
					await UserChart.updateOne(
						{
							id,
							user: user_id,
						},
						{
							name,
							hosts,
							image,
							data, 
							// $set: {
							// 	"data.defaultGraphNames": defaultGraphNames,
							// 	"data.customGraphNames": customGraphNames,
							// 	"data.colorIds": colorIds,
							// },
							customOptions,
							lastModified: new Date(),
						}
					);
					console.log(`updated chart ${name} of user ${user_id}`);
				}
			}
			return res.status(200).send();
		} catch (error) {
			console.log(error);
		}
	})
	.delete(async (req, res) => {
		const { user_id, id } = req.params;
		const { name } = req.body;
		try {
			const deleteChart = await UserChart.findOne({ user: user_id, id });
			if (deleteChart) {
				await UserChart.deleteOne({
					id,
					user: user_id,
					name,
				});
				console.log(`deleted User Chart ${name} of user ${user_id}`);
				return res.status(200).send();
			}
		} catch (error) {
			console.log(error);
		}
	});

module.exports = router;
