const express = require("express");
const { routeAuthentication } = require("../Middleware/Authorization/auth");
const { register, login, accessAnonymousBlogs, validateOTP } = require("../Controllers/Authentication/auth");
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(cookieParser());
router.post("/register", register);
router.post("/validateOTP", validateOTP);
router.post("/login", login);
router.get("/posts", routeAuthentication, accessAnonymousBlogs);

module.exports = router