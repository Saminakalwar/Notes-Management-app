//handling register + login routes here

const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { loginLimiter, registerLimiter } = require("../middleware/rateLimit");

//Public
router.post("/register", registerLimiter, authController.register); //Register
router.post("/login", loginLimiter, authController.login); // Login

//Protected
// router.use(auth);  or pass as parameter
router.get("/get-user", auth, authController.getUser); //Get User

module.exports = router;
