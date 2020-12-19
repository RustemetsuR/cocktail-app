const router = require("express").Router();
const config = require("../config");
const User = require("../models/User");
const axios = require('axios');

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post("/facebookLogin/register", async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.fb.appId + "|" + config.fb.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
    try {
        const response = await axios.get(debugTokenUrl);
        if (response.data.data.error) {
            return res.status(401).send({ message: "Facebook token incorrect" });
        }
        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({ message: "Wrong user ID" });
        }

        let user = await User.findOne({ facebookId: req.body.id });

        if (!user) {
            user = new User({
                facebookId: req.body.id,
                displayName: req.body.name,
                avatarImage: req.body.picture.data.url,
            });
        } else {
            return res.status(401).send({ error: "The user is already exist" });
        }
        user.generateToken();
        await user.save({ validateBeforeSave: false });
        res.send(user);
    } catch (e) {
        console.log(e.response.data);
        return res.status(401).send({ message: "Facebook token incorrect" });
    }
});

router.post("/facebookLogin/login", async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.fb.appId + "|" + config.fb.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
    try {
        const response = await axios.get(debugTokenUrl);
        if (response.data.data.error) {
            return res.status(401).send({ message: "Facebook token incorrect" });
        }
        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({ message: "Wrong user ID" });
        }

        let user = await User.findOne({ facebookId: req.body.id });

        if (!user) {
            return res.status(401).send({ error: "The user is already exist" });
        } else {
            user.generateToken();
            await user.save({ validateBeforeSave: false });
            res.send(user);
        }
    } catch (e) {
        console.log(e.response.data);
        return res.status(401).send({ message: "Facebook token incorrect" });
    }
});


router.delete("/sessions", async (req, res) => {
    const token = req.get("Authorization");
    const success = { message: "Success" };

    if (!token) return res.send(success);
    const user = await User.findOne({ token });

    if (!user) return res.send(success);

    user.generateToken();
    user.save({ validateBeforeSave: false });

    return res.send(success);
});

module.exports = router;