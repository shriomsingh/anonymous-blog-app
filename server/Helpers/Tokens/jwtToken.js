/* JWT Token Helpers */ 
const sendToken = (user, statusCode, res) => {
    const token = user.generateJwtForUser();
    res.status(statusCode).json({
        success: true,
        message: "User authenticated",
        token,
    });
}

const isToken = (req) => {
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    );
}

const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;
}

module.exports = { sendToken, isToken, getAccessTokenFromHeader }