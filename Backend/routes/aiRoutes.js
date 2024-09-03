const express = require('express');
require('dotenv').config();
const router = express.Router();
const Solution = require('../models/Solution');
const Problem = require('../models/Problem');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = async () => { 
    try {
        const res = await model.generateContent(prompt);
        return res;
    } catch (error) {
        console.error('Error generating content:', error);
    }
};

result().then(res => {
    if (res && res.response && res.response.text) {
        console.log(res.response.text);
    } else {
        console.log('No response received.');
    }
});
