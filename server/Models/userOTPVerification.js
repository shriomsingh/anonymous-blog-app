const mongoose = require("mongoose");

const UserOTPVerificationSchema = new mongoose.Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
}, {timestamps: true})

const userOTPVerification = mongoose.model('userOTPVerification', UserOTPVerificationSchema);

module.exports = userOTPVerification;