const User = require("../../Models/user");
const jwt = require("jsonwebtoken");
const { isToken, getAccessTokenFromHeader} = require("../../Helpers/Tokens/jwtToken");
const CustomError = require("../../Helpers/CustomError/customError");

const routeAuthentication = async (req, res, next) => {
    try{
        const { JWT_SECRET_KEY } = process.env;
        
        if(!isToken(req)){
            return next(new CustomError("You are not authorized to access this route", 401));
        }

        const accessToken = getAccessTokenFromHeader(req);
        const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);

        const user = await User.findById(decoded.id);

        if(!user){
            return next(new CustomError("You are not authorized to access this route", 401));
        }
        req.user = user;

        next();

    }catch(error){
        next(error);
    }
}

module.exports = { routeAuthentication }