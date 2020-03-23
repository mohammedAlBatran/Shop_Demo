const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String
        , required: true
        , maxlength: 100
        , minlength: 5
    }
    , email: {
        type: String
        , required: true
        , maxlength: 100
        , minlength: 5
        , unique: true
    }
    , password: {
        type: String
        , required: true
        , maxlength: 100
        , minlength: 5
    }
    , phone: {
        type: String
        , required: true
        , maxlength: 11
        , minlength: 11
    }
    , age: {
        type: Number
    }
});

userSchema.methods.createToken = function () {
    return jwt.sign({ id: this._id, email: this.email }, 'hereIsAnySecretKey');
}

const User = mongoose.model('user', userSchema);

function validateUser(reqBody) {
    const joischema = {
        name: joi.string().min(5).max(100).required()
        , email: joi.string().min(5).max(100).required().email()
        , password: joi.string().min(5).max(100).required()
        , phone: joi.string().min(11).max(11).required()
        , age: joi.number().integer().min(18).max(30)
    }
    return joi.validate(reqBody, joischema);
}

module.exports.User = User;
module.exports.Validate = validateUser;