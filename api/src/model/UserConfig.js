const mongoose = require("mongoose");

const UserConfig = new mongoose.Schema({
	config: {
		type: Object,
		required: true,
		properties: {
			fontSize: { type: Number },
		},
	},
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("UserConfig", UserConfig);
