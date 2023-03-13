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
            content: "Create terrible business idea and try to convince me it's a good idea."
        }]
    })
    return res.json(badidea?.data?.choices[0]?.message?.content);
}))

router.post('/stored-ideas', asyncHandler(async (req, res) => {
    const idea = req.body;
    const userId = req.user.id

    const newIdea = await BadIdea.build({
        userId,
        idea
    })

    return res.json(newIdea)
}))

router.get('storedideas', asyncHandler(async (req, res) => {
    const badideas = await BadIdea.findAll();

    return res.json(badideas)
}))

module.exports = router;