const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id,
                }, process.env.SECRET_KEY);
                res
                    .cookie('usertoken', userToken, {
                        httpOnly: true
                    })
                    .json({msg: "successfully registered", user: user});
            })
            .catch(err => res.json(err));
    },

    login: async (req, res) => {
        const user = await User.findOne({email: req.body.email});
        if (user === null) {
            return res.sendStatus(400);
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            return res.sendStatus(400);
        }
        const userToken = jwt.sign({
            id: user._id 
        }, process.env.SECRET_KEY);

        res
            .cookie("usertoken", userToken, {
                httpOnly:true
            })
            .json({msg: `success! You're logged in as ${user.username}`});
    },

    logout: (req, res)=> {
        console.log('You have been logged out!');
        res.clearCookie('usertoken');
        res.sendStatus(200);

    }
}