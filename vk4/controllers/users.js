const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");


usersRouter.post("/", async (req, res) => {
    const body = req.body;
    if (!body.password || body.password.length < 3)
        return res.status(400)
            .json({ error: "Password too short or missing!" });

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs");
    res.json(users.map (u => u.toJSON()));
});

module.exports = usersRouter;
