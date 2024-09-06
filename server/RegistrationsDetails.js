const mongoose = require("mongoose");

const UserDetails = new mongoose.Schema({
    firstName:String,
    middleName:String,
    lastName:String,
    email:{type: String, unique: true},
    password:String,
    confirmPassword:String,
}, {
    collection:"registrations"
});
mongoose.model("registrations", UserDetails);