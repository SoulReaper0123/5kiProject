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
    .then(() => console.log("Database Connected."))
    .catch((e) => console.log("Error Connecting to Database", e));

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
    status: String,
});

const User = mongoose.model("User", userSchema, "registrations");

// Loan schema and model
const loanSchema = new mongoose.Schema({
    userEmail: String,
    loanAmount: Number,
    term: Number,
    disbursement: String,
    accountName: String,
    accountNumber: String,
    processingFee: Number,
    releaseAmount: Number,
    status: { type: String, default: 'pending' },
    appliedAt: { type: Date, default: Date.now },
});

const Loan = mongoose.model("Loan", loanSchema, "applyloans");

// Loan Payment schema and model
const paymentSchema = new mongoose.Schema({
    paymentOption: String,
    accountNumber: String,
    amountToBePaid: Number,
    paymentDate: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema, "payloans");

// Deposit schema and model
const depositSchema = new mongoose.Schema({
    depositOption: String,
    accountNumber: String,
    amountToBeDeposited: Number,
    depositDate: { type: Date, default: Date.now },
});

const Deposit = mongoose.model("Deposit", depositSchema, "deposits");

// Withdrawal schema and model
const withdrawSchema = new mongoose.Schema({
    userEmail: String,
    withdrawAmount: Number,
    disbursement: String,
    accountName: String,
    accountNumber: String,
    withdrawDate: { type: Date, default: Date.now },
});

const Withdraw = mongoose.model("Withdraw", withdrawSchema, "withdrawals");

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
        dateOfBirth,
        status,
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
            dateOfBirth,
            status,
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
});

app.post('/apply-loan', async (req, res) => {
    const {
        userEmail,
        loanAmount,
        term,
        disbursement,
        accountName,
        accountNumber,
        processingFee,
        releaseAmount
    } = req.body;

    try {
        const loan = new Loan({
            userEmail,
            loanAmount,
            term,
            disbursement,
            accountName,
            accountNumber,
            processingFee,
            releaseAmount
        });

        const savedLoan = await loan.save();
        res.status(201).json(savedLoan);
    } catch (error) {
        console.error("Error applying for loan:", error);
        res.status(500).json({ message: "Error applying for loan", error });
    }
});

app.post('/pay-loan', async (req, res) => {
    const {
        paymentOption,
        accountNumber,
        amountToBePaid
    } = req.body;

    try {
        const payment = new Payment({
            paymentOption,
            accountNumber,
            amountToBePaid
        });

        const savedPayment = await payment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error("Error making loan payment:", error);
        res.status(500).json({ message: "Error making loan payment", error });
    }
});

app.post('/deposit', async (req, res) => {
    const {
        depositOption,
        accountNumber,
        amountToBeDeposited
    } = req.body;

    try {
        const deposit = new Deposit({
            depositOption,
            accountNumber,
            amountToBeDeposited
        });

        const savedDeposit = await deposit.save();
        res.status(201).json(savedDeposit);
    } catch (error) {
        console.error("Error making deposit:", error);
        res.status(500).json({ message: "Error making deposit", error });
    }
});

app.post('/withdraw', async (req, res) => {
    const {
        userEmail,
        withdrawAmount,
        disbursement,
        accountName,
        accountNumber
    } = req.body;

    try {
        const withdraw = new Withdraw({
            userEmail,
            withdrawAmount,
            disbursement,
            accountName,
            accountNumber
        });

        const savedWithdraw = await withdraw.save();
        res.status(201).json(savedWithdraw);
    } catch (error) {
        console.error("Error processing withdrawal:", error);
        res.status(500).json({ message: "Error processing withdrawal", error });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
