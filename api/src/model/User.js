const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
});

userSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		// remove these props when object is serialized
		delete ret._id;
		delete ret.passwordHash;
	},
});

module.exports = mongoose.model("User", userSchema);
