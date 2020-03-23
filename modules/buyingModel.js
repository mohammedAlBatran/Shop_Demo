let mongoose = require('mongoose');
//let goods = require('./goodsModel') ;
let Joi = require('joi');

let buyingSchema = new mongoose.Schema({
    customer: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId
    },
    process: [{
        product: {
            ref: 'product',
            type: mongoose.Schema.Types.ObjectId
        },
        quantity: { type: Number, required: true }
    }],
    time: { type: Date, default: new Date() }
});

let Buy = mongoose.model('buying', buyingSchema);

function JoiValidation(reqBody) {

    const processSchema = {
        product: Joi.required(),
        quantity: Joi.number().integer().required()
    }
    const schema = {
        customer: Joi.required(),
        process: Joi.array().min(1).items(Joi.object(processSchema)).required()
    };
    return Joi.validate(reqBody, schema);
}


module.exports.Buying = Buy;
module.exports.Validate = JoiValidation;