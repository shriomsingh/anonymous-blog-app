const express = require("express");
const { routeAuthentication } = require("../Middleware/Authorization/auth");
const { setUserMiddleWare } = require("../Middleware/User/handleUser");
const { register, login, accessAnonymousBlogs, validateOTP } = require("../Controllers/Authentication/auth");

const router = express.Router();

router.post("/register", setUserMiddleWare ,register);
router.post("/validateOTP", validateOTP);
router.post("/login", login);
router.get("/posts", routeAuthentication, accessAnonymousBlogs);

module.exports = router