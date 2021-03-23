const mongoose = require("mongoose");

const UserChart = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: false,
    },
    data: {
        type: Object,
        required: true,
    },
    hosts: {
        type: Array
    },
    chartType: {
        type: String,
        required: true,
    },
    customOptions: {
        type: Object,
        required: false,
        properties: {
            fontSize: { type: Number },
        },
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("UserChart", UserChart);
