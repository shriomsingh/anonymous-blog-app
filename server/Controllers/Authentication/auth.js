const User = require("../../Models/user");
const {validateSignup, validateLogin, comparePassword } = require("../../Helpers/ValidateUser/validateUserInput");
const { sendToken } = require("../../Helpers/Tokens/jwtToken");
const CustomError = require("../../Helpers/CustomError/customError");
const sendOtpEmail = require("../sendOtpEmail/sendOtpEmail");
const userOTPVerification = require("../../Models/userOTPVerification");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");


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

        const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 10;
        const salt =  await bcrypt.genSalt(parseInt(saltRounds));
        const hashedpassword =  await bcrypt.hash(password, salt);

        const _id = uuidv4();
 
        await sendOtpEmail(_id, username, email);
        res.cookie('user', {userId: _id, username: username, email: email, password: hashedpassword}, { httpOnly: true });

        res.status(200).json({
            success: true,
            message: "OTP sent successfully. Please Check your email for the OTP.",
            id : _id,
        });
       
    } catch(error){
        //Handle error if needed
        if(error.code == 11000 && error.keyPattern && error.keyPattern.username){
            return res.status(400).json({error: "Username already exist."});
        }
        if(error.code == 11000 && error.keyPattern && error.keyPattern.email){
            return res.status(400).json({error: "Email already exist."});
        }
        res.status(400).json({
            status: "FAILED",
            message: error.message,
        })
    }
}

const validateOTP = async (req, res, next) => {
    try{
        
        const { OTP } = req.body;
        if(!OTP){
            throw Error("Empty otp details are not allowed!!");
        }
        const { userId, username, email, password } = req.cookies.user;
        
        console.log("Cookies: ", req.cookies);
        const otpDetails = await userOTPVerification.findOne({userId: userId});

        const { otp, expiresAt } = otpDetails;
        console.log("OTP Details:", otpDetails);

        if(expiresAt < Date.now()){
            await userOTPVerification.deleteMany({userId});
            throw new Error("Code has expired. Please request again. ");
        } else{
            const validOTP = await bcrypt.compare(OTP , otp);
           
            if(!validOTP){
                throw new Error("Invalid OTP. Check your inbox")
            } else{
            
                const newUser = await User.create({
                    username,
                    email,
                    password,
                });
                await userOTPVerification.deleteMany({ userId });
                
                res.clearCookie('user');
                sendToken(newUser, 201, res);
            }
        }

    } catch(error) {
        console.error(error);
        res.status(400).json({
            status: "FAILED",
            message: error.message
        })
    }
} 

const login = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const userIdentifier = username ? {username}  : {email} ;
        if(!validateLogin(userIdentifier, password)){
            return res.status(400).json({status: 400 , message: "Provide a valid username-email or password"}); 
        }
        
        const user = await User.findOne(userIdentifier).select('+password');

        if(!user){
            return res.status(400).json({status: 400 , message: "You are not registered in the database"});
        }

        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(400).json({status: 400 , message: "You entered a wrong password"});
        }
        
        sendToken(user, 200, res);
    } catch(error){
        console.log(error);
        res.status(500).json({status: 500, message: error.message});
    }
}


module.exports = { accessAnonymousBlogs, register, validateOTP, login};