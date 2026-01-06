const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res, next) => {
    try {
        const data = await fs.promises.readFile('categories.json', 'utf8');
        const category = JSON.parse(data);
        res.json(category);

    } catch (error) {
        next(error);
    }
})
router.get('/:id', async (req, res, next) => {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
        res.status(400)
    }
    try {
        const data = await fs.promises.readFile('categories.json', 'utf8');
        const category = JSON.parse(data);
        const categoryFind = category.find(c => {
            return c.id === categoryId;
        })
        if (!categoryFind) {
            res.status(404);

        }

        res.json(categoryFind);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newCategory = req.body;
        const data = await fs.promises.readFile('categories.json', 'utf8');
        const category = JSON.parse(data);
        newCategory.id = category.length + 1;
        category.push(newCategory);
        await fs.promises.writeFile('categories.json', JSON.stringify(category, null, 2), 'utf-8');
        res.status(201).json(newCategory)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
        res.status(400)
    }
    try {
        const updateCategory = req.body;
        const data = await fs.promises.readFile('categories.json', 'utf8');
        const category = JSON.parse(data);
        const categoryFindIndex = category.findIndex(c => {
            return c.id === categoryId;
        });
        if (categoryFindIndex === -1) {
            return res.status(404).send('khong tim thay san pham')
        }
        category[categoryFindIndex] = { ...category[categoryFindIndex], ...updateCategory };
        await fs.promises.writeFile('categories.json', JSON.stringify(category, null, 2));
        res.json(category[categoryFindIndex]);

    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
        res.status(400)
    }
    try {

        const data = await fs.promises.readFile('categories.json', 'utf8');
        const category = JSON.parse(data);
        const categoryFindIndex = category.findIndex(c => {
            return c.id === categoryId;
        });
        if (categoryFindIndex === -1) {
            return res.status(404).send('khong tim thay san pham')
        }
        category.splice(categoryFindIndex, 1);
        await fs.promises.writeFile('categories.json', JSON.stringify(category, null, 2));
        res.status(204).send()
    } catch (error) {
        next(error);
    }
})

module.exports = router;