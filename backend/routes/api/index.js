const router = require('express').Router();
const usersRouter = require("./users.js");
const badideasRouter = require("./badideas.js")

router.use("/users", usersRouter);
router.use("/badideas", badideasRouter)

module.exports = router;