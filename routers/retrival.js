let express = require('express');
let Buying = require('../modules/buyingModel').Buying;
let Product = require('../modules/productModel').Product;
let { Retrival, Validate } = require('../modules/retrivalModel');

let router = express.Router();


router.post('/', (req, res) => {
    let { error } = Validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }
    Buying.findOne({ _id: req.body.oldBuy }).then(async (proce) => {
        if (proce) {
            for (let pro of req.body.process) {
                Product.findOne({ _id: pro.product }).then(async (result) => {
                    result.quantity = result.quantity + pro.quantity;
                    await result.save()
                }).catch((err) => res.send(err))
            }
            let retProcess = new Retrival({
                oldBuy: req.body.oldBuy,
                process: req.body.process
            });
            let finalResult = await retProcess.save();
            res.send(finalResult);
        }
    }).catch((err) => res.send(err.message))
})

/*********************************************************** */
router.get('/', async (req, res) => {
    let result = await Retrival.find()
        .populate({
            path: 'oldBuy',
            select: "-_id",
            populate: { path: 'customer' }
        })
    res.send(result);
})
/*********************************************************** */

router.get('/:id', async (req, res) => {
    Retrival.findOne({ _id: req.params.id })
        .populate({
            path: 'oldBuy',
            select: "-_id",
            populate: { path: 'customer' }
        })
        .then((result) => {
            if (result) {
                res.send(result)
            }
            else {
                res.send('Element not fount to get')
            }

        })
        .catch((err) => res.send(err.message))
})
/*********************************************************** */

router.delete('/:id', async (req, res) => {
    Retrival.findByIdAndDelete({ _id: req.params.id })
        .populate({
            path: 'oldBuy',
            select: "-_id",
            populate: ({
                path: 'customer',
                select: 'name -_id'
            })
        })
        .populate('process.product')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => res.send(err.message))
})


module.exports = router;
