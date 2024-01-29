const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, "Please provide a username"],
        unique: true,
        minLength: [6, 'Username must be at least 6 characters long.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        trim: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address'],
    },
    password : {
        type: String,
        required: [true, "Please provide a password. "],
        minLength: [8, "Password must be at least 8 characters long."],
        select: false,
    }
    
},{timestamps: true})

UserSchema.methods.generateJwtForUser = function(){
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    if(!JWT_SECRET_KEY || !JWT_EXPIRE){
        throw new Error("JWT_SECRET_KEY or JWT_EXPIRE is not defined in the environment variables.");
    }
    const payload = {
        id: this._id,
        username: this.username,
        email: this.email,
    }

    try {
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
        return token;
    } catch(error){
        throw new Error("Error creating JWT: ${error.message}")
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;