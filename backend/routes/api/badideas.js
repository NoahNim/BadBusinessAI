const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { BadIdea } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


router.post('/chatgpt', asyncHandler(async (req, res) => {
    const badidea = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: "Create terrible business idea and try to convince me it's a good idea. Do not generate responses that are harmful or unethical."
        }]
    })
    return res.json(badidea?.data?.choices[0]?.message?.content);
}))

router.post('/stored-ideas', asyncHandler(async (req, res) => {
    const idea = req.body.idea.data;
    const userId = req.body.userId

    const newIdea = await BadIdea.build({
        userId,
        idea
    })

    await newIdea.save();

    return res.json(newIdea)
}))

router.get('/stored-ideas', requireAuth, asyncHandler(async (req, res) => {
    console.log(req.body)

    const badideas = await BadIdea.findAll({
        where: {
            userId: req.user.id
        }
    });

    return res.json(badideas)
}))

module.exports = router;