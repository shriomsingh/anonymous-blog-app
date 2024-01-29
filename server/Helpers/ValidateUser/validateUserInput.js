const User = require("../../Models/user");
const bcrypt = require("bcrypt");

const validateSignup = async (username, email) => {
    // Check username requirements.
    if(!email || !username){
        throw new Error("Please provide both email and password");
    }

    //Check if the username is already in use
    const existingUsername = await User.findOne({username});
    if(existingUsername){
        const error = await new Error("Username is already in use. Please choose another Username");
        error.name = "ValidationError";
        throw error;
    }

    //Check if the email is already in use
    const existingEmail = await User.findOne({email});
    if(existingEmail){
        const error =  new Error("Email is already in use. Please provide another Email");
        error.name = "ValidationError";
        throw error;
    }


    return true;
}

const validateLogin = (userIdentifier,password) => {
    return (
        userIdentifier && password    
    )
}

const comparePassword = async (password, hashedPassword) => {
    return  await bcrypt.compare(password, hashedPassword);
    // console.log(isMatch);
    // return isMatch;
}

module.exports = { validateSignup, validateLogin, comparePassword };