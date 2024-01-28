const User = require("../../Models/user");
const nodemailer = require("nodemailer");
const {validateSignup, validateLogin, comparePassword } = require("../../Helpers/ValidateUser/validateUserInput");
const { sendToken } = require("../../Helpers/Tokens/jwtToken");
const CustomError = require("../../Helpers/CustomError/customError");
const sendOtpEmail = require("../sendOtpEmail/sendOtpEmail");
const otpGenerator = require("otp-generator");

const localstorage = [];

const accessAnonymousBlogs = async(req, res, next) => {
    try{
        return res.status(200).json({
            success: true,
            message: "Now you can access the anonymous posts. ",
        });
    } catch(error){
        //Handle errors if needed
        next(error);
    }
}

const register = async(req, res) => {
    try{
        const { username, email, password } = req.body;

        // Check if user already exists in the database
        const validationResult = await validateSignup(username, email, password);
        
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error });
        }
 
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        await sendOtpEmail(username, email, otp);
        

        res.status(200).json({
            success: true,
            message: "OTP sent successfully. Please Check your email for the OTP.",
            user: {username, email, password, otp }
        });

        next();
       
    } catch(error){
        //Handle error if needed
        if(error.code == 11000 && error.keyPattern && error.keyPattern.username){
            return res.status(400).json({error: "Username already exist."});
        }
        if(error.code == 11000 && error.keyPattern && error.keyPattern.email){
            return res.status(400).json({error: "Email already exist."});
        }
        // next(error);
    }
}

const validateOTP = async (req, res, next) => {
    try{
        
        const { submittedOtp } = req.body;

        const { username, email, password,} = req.user;
        console.log("User details: ", req.user);

        if(!otp || submittedOtp !== otp){
            return next(new CustomError("Invalid OTP", 401));
        }

        const newUser = await User.create({
            username,
            email,
            password,
        });

        sendToken(newUser, 201, res);
        
        return res.status(200).json({
            success: true,
            message: "OTP validated successfully",
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
} 

const login = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;
        
        const userIdentifier = username ? {username}  : {email} ;
        console.log(userIdentifier);
        if(!validateLogin(userIdentifier, password)){
            return next(new CustomError("Please provide a valid username and password.", 400));
        }
        
        const user = await User.findOne(userIdentifier).select('+password');
        if(!user){
            return next(new CustomError("Invalid credentials", 401));
        }
        if(!comparePassword(password, user.password)){
            return next(new CustomError("Invalid credentials", 401))
        }

        sendToken(user, 200, res);
    } catch(error){
        console.log(error);
        next(error);
    }
}


module.exports = { accessAnonymousBlogs, register, validateOTP, login};