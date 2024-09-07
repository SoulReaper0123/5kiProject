const mongoose = require("mongoose");

const UserDetails = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    gender: { type: String, required: true },
    civilStatus: { type: String },
    placeOfBirth: { type: String },
    address: { type: String },
    age: { type: Number },
    dateOfBirth: { type: Date, required: true }
}, {
    collection: "registrations"
});

mongoose.model("registrations", UserDetails);
