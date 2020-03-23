let { Product, Category, Validate } = require('../modules/productModel');
let express = require('express');
let router = express.Router();

router.post('/', async (req, res) => {
    let { error } = Validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }
    let newproduct = new Product({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        category: Category({
            _id: req.body.category._id,
            name: req.body.category.name,
            descripition: req.body.category.descripition,
        })
    });
    let result = await newproduct.save();
    if (result) {
        return res.send(result);
    }
    else { res.status(400).send('Error Happen !!'); }
});


router.get('/', async (req, res) => {
    let products = await Product.find();
    res.send(products);
});

router.get('/:id', async (req, res) => {
    try {
        const res = await Product.findOne({ _id: req.params.id })
        res.send(res);
    }
    catch (error) { res.status(404).send("product not found"); }
});
router.delete('/:id', async (req, res) => {
    try {
        const res = await Product.findByIdAndDelete(req.params.id)
        res.send(res);
    }
    catch (error) { res.status(404).send("product not found"); }

});

router.put('/:id', async (req, res) => {
    let { error } = Validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }
    let product = await Product.findOne({ _id: req.params.id })
    if (!product) {
        return res.send('Prouduct not found');
    }
    product.name = req.body.name;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    product.category._id = req.body.category._id;
    product.category.name = req.body.category.name;
    product.category.descripition = req.body.category.descripition;
    product.save().then((product) => res.send(product)).catch((err) => res.send(err.message));
})

module.exports = router;
