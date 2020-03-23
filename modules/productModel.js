let mongoose = require('mongoose');
let Joi = require('joi');

let categorySchema = new mongoose.Schema({
    _id: {
        type: Number
        , required: true
        , min: 1
    }
    , name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    descripition:
    {
        type: String,
        required: true
    }
});

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        get: value => value = value + ' $'
    },
    category: { type: categorySchema, required: true }
});
let Category = mongoose.model('category', categorySchema);
let Product = mongoose.model('product', productSchema);

function JoiValidation(reqBody) {
    const schema = {
        name: Joi.string().min(3).max(20).required().trim(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().min(0).required(),
        category: {
            _id: Joi.number().integer().min(1).required(),
            name: Joi.string().min(3).max(20).required().trim(),
            descripition: Joi.string().required().trim(),
        }
    }
    return Joi.validate(reqBody, schema);

}





module.exports.Product = Product;
module.exports.Category = Category;
module.exports.Validate = JoiValidation;