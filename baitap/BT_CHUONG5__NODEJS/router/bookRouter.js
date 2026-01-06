const express = require('express');
const { Book, Author, Genre } = require('../models');
const { Op, where } = require('sequelize');
const e = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const nameSearch = req.query.nameSearch || '' // tim ten sach 
        // const publishYear = req.query.publishYear || '' // loc theo nam  
        // phan trang 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;


        const books = await Book.findAll(
            {
                where: {
                    title: { [Op.like]: `%${nameSearch}%` }
                },
                include: [
                    {
                        model: Author,
                        as: 'author'
                    },
                    {
                        model: Genre,
                        as: 'genres'
                    }
                ],
                order: [
                    ['publishYear', 'DESC'],
                    ['title', 'ASC']

                ],
                limit,
                offset
            }
        )
        res.json(books)
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const books = await Book.findByPk(req.params.id,
            {
                include: [
                    {
                        model: Author,
                        as: 'author',
                        attributes: ['name'] // ten tac gia
                    },
                    {
                        model: Genre,
                        as: 'genres',
                        attributes: ['name'],// ten the loai
                        through: { attributes: [] }
                    }
                ]
            }
        )
        if (!books) {
            return res.status(404).json({ message: 'khong tim thay san pham ' })
        }
        res.json(books)
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const newBooks = await Book.create(req.body) ;
        res.status(201).json(newBooks);
    } catch (error) {
        next(error)
    }
});

router.put('/:id' ,async (req,res,next) => {
    try {
        const [updateRows]= await Book.update(req.body ,{where :{id : req.params.id}}) ;
        if(updateRows === 0 ) {
            return res.status(404).json({message:'khong tim thay san pham'});

        }
        const updateBooks = await Book.findByPk(req.params.id) ;
        res.json(updateBooks)
    } catch (error) {
        next(error) ;
    }
});

router.delete('/:id' , async (req ,res , next) => {
    try {
        const deleteRows = await Book.destroy({where : {id : req.params.id}});
        if(deleteRows === 0) {
            return res.status(404).json({message:'khong tim thay san pham'});
        }
        res.status(204).send() ;
    } catch (error) {
        next(error) ;
    }
})
module.exports = router;