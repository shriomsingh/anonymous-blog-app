const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();
sgMail.setApiKey(process.env.SGMAIL_SECRET_KEY);

const sendOtpEmail = async (username, email, otp) => {
    
    const templatePath = path.join(__dirname, 'emailTemplate.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

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
        await sgMail.send(msg)
        console.log("Email sent successfully");

    } catch(error){
        console.error(error);
        if(next) next(error);
    }
}

module.exports = sendOtpEmail;