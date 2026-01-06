const express = require('express');
const router = express.Router();

const { Product, Category, Tag } = require('../models');

const { Op } = require('sequelize');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const { commonIdParamValidation, createProductValidationRules, updateProductValidationRules } = require('../validators/productValidator');
router.get('/products', async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'categorys'
                },
                {
                    model: Tag,
                    as: 'tags'
                },
            ],
            // where: {
            //     // price : {[Op.gte] : req.query.minPrice , [Op.lte] : req.query.maxPrice}
            //     // name :{[Op.like] :`%${req.query.nameSearch}%`}
            //     // categoryId : {[Op.in] : [1,2]}
            //     [Op.and]: [
            //         {
            //             price: { [Op.gte]: req.query.minPrice},
            //         },
            //         {
            //             categoryId : {[Op.in] : [1,2]} 
            //         }
            //     ]
            // }
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/products/:id',
    commonIdParamValidation,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const products = await Product.findByPk(req.params.id);
            if (!products) {
                return res.status(404).send('khong tim thay')
            }
            res.json(products);
        } catch (error) {
            next(error)
        }
    })

router.post('/products',
    createProductValidationRules,
    handleValidationErrors,
    async (req, res, next) => {

        try {
            const newProduct = await Product.create(req.body);
            res.status(201).json(newProduct);

        } catch (error) {
            next(error)
        }
    })

router.put('/products:id',
    updateProductValidationRules,
    async (req, res, next) => {
    try {
        const [updateRows] = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        if (updateRows === 0) {
            return res.status(404).send('khong tim thay')
        }
        const updateProducts = await Product.findByPk(req.params.id);
        res.json(updateProducts);

    } catch (error) {
        next(error)
    }
});

router.delete('/products/:id', async (req, res, next) => {
    try {
        const deleteRows = await Product.destroy({
            where: { id: req.params.id }
        })
        if (deleteRows === 0) {
            return res.status(404).send('khong tim thay')
        }
        res.status(204).send();
    } catch (error) {
        next(error)
    }
})
module.exports = router;