const User = require("../models/User");
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");

//generate jwt token
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

//@desc register a new user
//@route POST/api/auth/register
//@access public
const registerUser = async(req, res) => {};

//@desc login user
//@route POST/api/auth/login
//@access public
const loginUser = async(req, res) => {};

//@desc get user profile
//@route GET/api/auth/profile
//@access private(requires jwt)
const getUserProfile = async (req, res) =>{};

//@desc update user profile
//@route PUT/api/auth/profile
//@access private (requires jwt)
const updateUserProfile = async(req, res) => {};

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile};