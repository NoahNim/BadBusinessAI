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
    const badidea = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: "Give me a bad business idea and create a pitch for that bad business idea."
        }]
    })
    return res.json(badidea?.data?.choices[0]?.message?.content);
}))



module.exports = router;