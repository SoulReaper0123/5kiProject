const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bc")

const mongoUrl = "mongodb+srv://5KI:5KI000@5kicluster.n6hud.mongodb.net/5KI?retryWrites=true&w=majority&appName=5kiCluster";

// Connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected.");
    })
    .catch((e) => {
        console.log("Error Connecting to Database", e);
    });

// Middleware to parse JSON
app.use(express.json());

// Import the User model
require('./RegistrationsDetails'); // Ensure your schema is properly defined in this file

// Correct the model name to match the schema
const User = mongoose.model("registrations"); 

// Routes
app.get("/", (req, res) => {
    res.send({ status: "started" });
});

app.post('/register', async (req, res) => {
    const { firstName, middleName, lastName, email, password, confirmPassword } = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "Email Already Exists!" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            firstName,
            middleName,
            lastName,
            email,
            password: encryptedPassword,
            confirmPassword,
        });
        res.send({ status: "ok", data: "User created" });
    } catch (error) {
        res.send({ status: "error", data: error.message });
    }
});

// Start the server on the correct port
app.listen(3000, () => {
    console.log("Node Server started on port 3000.");  // Match with the frontend
});