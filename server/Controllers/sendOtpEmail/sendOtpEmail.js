const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const userOTPVerification  = require("../../Models/userOTPVerification");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");


dotenv.config();
sgMail.setApiKey(process.env.SGMAIL_SECRET_KEY);

const sendOtpEmail = async (_id, username, email) => {
    
    const templatePath = path.join(__dirname, 'emailTemplate.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 10;
    const salt =  await bcrypt.genSalt(parseInt(saltRounds));
    const hashedOTP =  await bcrypt.hash(otp, salt);
        
    const formattedHtml = htmlTemplate
        .replace('{{username}}', username)
        .replace('{{otp}}', otp)

    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Your OTP Code for verification',
        html: formattedHtml,
    }

    try {       
        const newOTPVerification = await new userOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        await newOTPVerification.save();
        await sgMail.send(msg)
        console.log("Email sent successfully");
        console.log("OTP Details: ", newOTPVerification);

    } catch(error){
        console.error(error);
        if(next) next(error);
    }
}

module.exports = sendOtpEmail;