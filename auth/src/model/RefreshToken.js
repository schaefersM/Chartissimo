const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
    created: { 
        type: Date, 
        default: Date.now 
    },
    createdByIp: String,
    expires: Date,
    revoked: Date,
    revokedByIp: String,
    token: String,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
});

refreshTokenSchema.virtual("isExpired").get(function () {
    return Date.now() >= this.expires;
});

refreshTokenSchema.virtual("isActive").get(function () {
    return !this.revoked && !this.isExpired;
});


module.exports = mongoose.model("RefreshToken", refreshTokenSchema);