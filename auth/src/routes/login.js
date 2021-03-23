const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = require('express').Router();
const loginSchema = require("../validation/loginSchema")
const RefreshToken = require('../model/RefreshToken')
const User = require('../model/User')
const validation = require("../middleware/validation")


router.use(validation(loginSchema))

router.route("/")
  .post(async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (user) {
            const { _id, name, email, password } = user;
            const ipAddress = req.ip
            bcrypt.compare(req.body.password, password, async (err, result) => {
                user.password = undefined;
                console.log(user)
                if (result === true) {
                    await RefreshToken.deleteMany({user: user._id});
                    const accessToken = jwt.sign(
                        { user },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "7d",
                        }
                    );
                    const refreshToken = jwt.sign(
                        { user },
                        process.env.REFRESH_TOKEN_SECRET,
                        {
                            expiresIn: "7d",
                        }
                    );
                    res.cookie("accesscookie", accessToken, {
                        maxAge: 90000000,
                        httpOnly: true,
                    });
                    res.cookie("refreshcookie", refreshToken, {
                        maxAge: 90000000,
                        httpOnly: true,
                    });
                    const newRefreshToken = new RefreshToken({
                        user: _id,
                        token: refreshToken,
                        expires: new Date(Date.now() + 90000000),
                        createdByIp: ipAddress,
                    });
                    newRefreshToken.save()
                    console.log(`${user.name} is authenticated`)
                    return res
                        .status(200)
                        .json({
                            isAuthenticated: true,
                            user: { user_id: _id, name, email },
                        });
                } else {
                    console.log(err);
                    return res.status(400).send({
                        errorMessage: "User or password is wrong",
                    });
                }
            });
        } else {
            return res.status(400).send({ errorMessage: "Couldn't find user in the database. Are you registered yet?" });
        }
    } catch (e) {
        console.log(e);
    }
  })

module.exports = router;