const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/products', async (req, res, next) => {
    try {
        const data = await fs.promises.readFile('data.json', 'utf8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        next(error)
    }
});

router.get('/products/:id', async (req, res, next) => {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
        res.status(400);
    }
    try {
        const data = await fs.promises.readFile('data.json', 'utf8');
        const products = JSON.parse(data);
        const productFind = products.find(p => {
            return p.id === productId;
        });
        if (!productFind) {
            res.status(404);
        }
        res.json(productFind)
    } catch (error) {
        next(error)
    }
})

router.post('/products', async (req, res, next) => {
    try {
        const newProducts = req.body;
        const data = await fs.promises.readFile('data.json', 'utf8');
        const products = JSON.parse(data);
        newProducts.id = products.length + 1;
        products.push(newProducts);
        await fs.promises.writeFile('data.json', JSON.stringify(products, null, 2), 'utf8')
        res.status(201).json(newProducts)
    } catch (error) {
        next(error)
    }
});

router.put('/products/:id', async (req, res, next) => {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
        res.status(400);
    }
    try {
        const updateProducts = req.body;
        const data = await fs.promises.readFile('data.json', 'utf8');
        const products = JSON.parse(data);
        const productFindIndex = products.findIndex(p => {
            return p.id === productId;
        });
        if (productFindIndex === -1) {
            return res.status(404).send('khong tim thay san pham')
        }
        products[productFindIndex] = { ...products[productFindIndex], ...updateProducts };
        await fs.promises.writeFile('data.json', JSON.stringify(products, null, 2), 'utf8');
        res.status(200).json(products[productFindIndex]);
    } catch (error) {
        next(error)
    }
})

router.delete('/products/:id', async (req, res, next) => {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
        res.status(400);
    }
    try {
        const data = await fs.promises.readFile('data.json', 'utf8');
        const products = JSON.parse(data);
        const productFindIndex = products.findIndex(p => {
            return p.id === productId;
        });
        if (productFindIndex === -1) {
            return res.status(404).send('khong tim thay san pham')
        }
        products.splice(productFindIndex, 1)

        await fs.promises.writeFile('data.json', JSON.stringify(products, null, 2), 'utf8');
        res.status(204).json();
    } catch (error) {
        next(error)
    }
})

module.exports = router;