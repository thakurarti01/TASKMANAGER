const express = require("express");
const {registerUser, loginUser, getUserProfile, updateUserProfile} = require("../controllers/authContoller");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

//Auth Routes
router.post("/register", registerUser); //register user
router.post("/login", loginUser); //login user
router.post("/profile",protect, getUserProfile); //get user profile
router.post("/profile", protect, updateUserProfile); //update profile

module.exports = router;