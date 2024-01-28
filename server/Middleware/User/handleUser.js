const setUserMiddleWare = async (req, res, next) => {
    const { username, email, password } = req.body;

    console.log("Incoming request: ", req.user);
    console.log("Extracted data: ", {username, email, password});
    
    req.userDetails = { username: username, email: email, password: password};
    next();
}

module.exports = { setUserMiddleWare }