let mongoose = require('mongoose');
let Joi = require('joi');

let retrivalSchema = new mongoose.Schema({
    oldBuy: {
        ref: 'buying',
        type: mongoose.Schema.Types.ObjectId
    },
    process: [{
        product: {
            ref: 'product',
            type: mongoose.Schema.Types.ObjectId
        },
        quantity: Number
    }],
    time: { type: Date, default: new Date() }
});

let Retrival = mongoose.model('retrival', retrivalSchema);

function JoiValidation(reqBody) {
    let processSchema = {
        product: Joi.required(),
        quantity: Joi.required()
    }
    let schema = {
        oldBuy: Joi.required(),
        process: Joi.array().min(1).items(Joi.object(processSchema)).required()
    }
    return Joi.validate(reqBody, schema);
}

module.exports.Retrival = Retrival;
module.exports.Validate = JoiValidation;