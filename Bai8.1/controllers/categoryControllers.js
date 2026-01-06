const { Category ,Product } = require('../models');

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll(
            {
                include: [{
                    model: Product,
                    as: 'products'
                }]
            }
        );
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

exports.getCategoryById = async (req, res, next) => {
    try {
        const categories = await Category.findByPk(req.params.id);
        if (!categories) {
            return res.status(404).send('khong tim thay')
        }
        res.json(categories)

    } catch (error) {
        next(error);
    }
}

exports.createCategory = async (req, res, next) => {

    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: [
                    {
                        msg: "Ten danh muc da ton tai",
                        param: 'name',
                        location: 'body'
                    }
                ]
            })
        } // day la dieu kien de check la  ten san pham da ton tai tren

        next(error)
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        // updateRows : la so dong de cap nhat 
        const [updateRows] = await Category.update(req.body, {
            where: { id: req.params.id }
        })
        if (updateRows === 0) {
            return res.status(404).send('khong tim thay')
        }
        const updateCategories = await Category.findByPk(req.params.id);
        res.json(updateCategories)
    } catch (error) {
        next(error)
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const deleteRows = await Category.destroy({
            where: { id: req.params.id }
        })
        if (deleteRows === 0) {
            return res.status(404).send('khong tim thay')
        }
        res.status(204).send();
    } catch (error) {
        next(error)
    }
};
