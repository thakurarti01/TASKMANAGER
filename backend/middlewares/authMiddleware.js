const jwt = require("jsonwebtoken");
const User = require("../models/User");

//middleware to protect routes
const protect = async (req, res, next) => {
    console.log("🔒 Protect middleware running"); // ✅ Add here
    try{
        let token = req.headers.authorization;
        console.log("📦 Incoming token header:", token); // ✅ Add this

        if(token && token.startsWith("Bearer")){
            token = token.split(" ")[1]; //extract token
            console.log("🪪 Extracted token:", token); // ✅ Add this
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Token decoded:", decoded); // ✅ Add this
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } else{
            console.log("❌ No token or invalid format");// add this
            res.status(401).json({message: "Not authorized, no token"});
        }
    } catch (error){
        console.log("❌ Token verification failed:", error.message); // ✅ Add this
        res.status(401).json({message: "Token failed", error:error.message});
    }
};

// middleware for admin-only access
const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    } else {
        res.status(403).json({message: "Access denied, admin only"});
    }
};

module.exports = {protect, adminOnly};