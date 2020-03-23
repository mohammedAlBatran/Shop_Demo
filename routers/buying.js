let express = require('express');
let { Buying, Validate } = require('../modules/buyingModel');
let Product = require('../modules/productModel').Product;

let router = express.Router();


router.post('/', async (req, res) => {
    let { error } = Validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }

    for (let pro of req.body.process) {
        let result = await Product.findOne({ _id: pro.product });
        if (!result) {
            return res.status(404).send('Product not found to sell');
        }
        result.quantity -= pro.quantity;
        result.save().then().catch(err => res.send(err));
    }
    let buy = new Buying({
        customer: req.body.customer,
        process: req.body.process
    })
    let newBuying = await buy.save();
    res.send(newBuying);
})

/*********************************************/
router.get('/', async (req, res) => {
    let result = await Buying.find()
        .populate('customer', 'name')
        .populate('process.product')
    res.send(result);
})

/* ==================================================*/
router.delete('/:id', async (req, res) => {
    Buying.findOneAndDelete({ _id: req.params.id })
        .populate('customer')
        .populate('process.product')
        .then((process) => {
            if (process) {
                res.send(process);
            }
            else {
                res.status(404).send('Process Not Found -- Plase Make Sure From Id');
            }
        })
        .catch((error) => {
            res.send(error.message);
        })
})
/* ====================================================*/
router.get('/:id', async (req, res) => {
    Buying.findOne({ _id: req.params.id })
        .populate('customer')
        .populate('process.product')
        .then((process) => {
            if (process) {
                res.send(process);
            }
            else {
                res.status(404).send('Process Not Found -- Plase Make Sure From Id !');
            }
        })
        .catch((error) => {
            res.send(error.message);
        })
})

module.exports = router;
