const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { BadIdea } = require("../../db/models");
const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


router.post('/chatgpt', asyncHandler(async (req, res) => {
    const res = await openai.createCompletion({
        modal: "gpt-3.5-turbo",
        prompt: "Give me a bad business idea and create a pitch for that bad business idea."
    })
    return res.json();
}))



module.exports = router;