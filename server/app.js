const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUrl = "mongodb+srv://5KI:5KI000@5kicluster.n6hud.mongodb.net/5KI?retryWrites=true&w=majority&appName=5kiCluster";
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Database Connected.");
    })
    .catch((e) => {
        console.log("Error Connecting to Database", e);
    });

// User schema and model
const userSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    age: Number,
    email: String,
    phoneNumber: String,
    password: String,
    confirmPassword: String,
    gender: String,
    civilStatus: String,
    dateOfBirth: Date,
    validId: String,
    selfie: String,
});

const User = mongoose.model("User", userSchema, "registrations");

// Routes
app.get("/", (req, res) => {
    res.send({ status: "started" });
});

app.post('/register', async (req, res) => {
    const { 
        firstName,
        middleName,
        lastName,
        age,
        email,
        phoneNumber,
        password,
        confirmPassword,
        gender,
        civilStatus,
        dateOfBirth
    } = req.body;

    try {
        const user = new User({
            firstName,
            middleName,
            lastName,
            age,
            email,
            phoneNumber,
            password,
            confirmPassword,
            gender,
            civilStatus,
            dateOfBirth
        });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        // Save user
        await user.save();
        res.send({ status: "ok", data: "User registered successfully" });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.post('/updateImages', async (req, res) => {
    const { email, validId, selfie } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ status: 'error', data: 'User not found' });
        }

        // Update user with image URLs
        user.validId = validId;
        user.selfie = selfie;
        await user.save();

        res.send({ status: 'ok', data: 'Images updated successfully' });
    } catch (error) {
        console.error('Error updating images:', error);
        res.status(500).send({ status: 'error', data: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
