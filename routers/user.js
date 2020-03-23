let express = require('express');
let { User, Validate } = require('../modules/userModule');
let bcrypt = require('bcrypt');

let router = express.Router();

router.post('/', async (req, res) => {
    /*
    1- validate !!
    2- check email !1
    3 - hash password
    4 - save to database
    5- send Header
    */
    let { error } = Validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);// error.details[0].message
    }
    let foundOrNot = await User.findOne({ email: req.body.email });
    if (foundOrNot) {
        return res.status(400).send('Email Already Found Choose Another One');
    }
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
    newUser.password = await bcrypt.hash(req.body.password, 10);
    let user = await newUser.save();
    // send json web token at header
    res.header('x-auth-token', user.createToken()).send('Welcome : ' + user.name + '|| You Become New Member Now -_-');
})

module.exports = router;