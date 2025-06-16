const mongoose = require("mongoose");

const UserSchemea = new mongoose.Schema(
    {
        name: {type:String, required: true},
        email: {type:String, required: true, unique: true},
        password: {type:String, required: true},
        profileImageUrl: {type:String, default: null},
        role: {type: String, enum: ["admin", "member"], default: "member"}, //Role-based access
        //(as dafault role is set as member, whenever we will login/signup we will land on user page)

    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchemea);