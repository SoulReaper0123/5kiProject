import axios from 'axios';

const BASE_URL = 'http://192.168.1.12:3000'; // Replace with your backend URL

// Function to register a user
export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, formData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

// Function to update user images
export const updateUserImages = async (email, validIdUrl, selfieUrl) => {
    try {
        const response = await axios.post(`${BASE_URL}/updateImages`, {
            email,
            validId: validIdUrl,
            selfie: selfieUrl,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user images:', error);
        throw error;
    }
};

// Function to submit a loan application
export const submitLoanApplication = async (applicationData) => {
    try {
        const response = await axios.post(`${BASE_URL}/applyLoan`, applicationData);
        return response.data;
    } catch (error) {
        console.error('Error during loan application submission:', error);
        throw error;
    }
};

// Function to handle loan payments
export const handleLoanPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/payLoan`, paymentData); // Corrected endpoint to match backend
        return response.data;
    } catch (error) {
        console.error('Error during loan payment submission:', error);
        throw error;
    }
};

// Function to handle deposits
export const handleDeposit = async (depositData) => {
    try {
        const response = await axios.post(`${BASE_URL}/deposit`, depositData);
        return response.data;
    } catch (error) {
        console.error('Error submitting deposit data:', error);
        throw error;
    }
};

// Function to handle withdrawals
export const handleWithdraw = async (withdrawData) => {
    try {
        const response = await axios.post(`${BASE_URL}/withdraw`, withdrawData);
        return response.data;
    } catch (error) {
        console.error('Error submitting withdrawal data:', error);
        throw error;
    }
};
