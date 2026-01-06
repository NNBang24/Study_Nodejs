const { query, body, param } = require('express-validator');

const listBooksValidationRules = () => {
    return [
        query('title')
            .optional()
            .isString().withMessage('title phai la chuoi')
            .isLength({ max: 255 }).withMessage('title qua dai')
            .trim(),
        query('publishYear')
            .optional()
            .toInt()
            .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('publishYear khong hop le'),
        query('page')
            .optional()
            .toInt()
            .isInt({ min: 1 }).withMessage('Page phai >= 1')
            .default(1),
        query('limit')
            .optional()
            .toInt()
            .isInt({ min: 1, max: 1000 }).withMessage('Limit không hợp lệ')
            .default(10)
    ]
}

const createBookValidationRules = () => {
    return [
        body('title')
            .notEmpty().withMessage('khong duoc bo trong')
            .isLength({ min: 2, max: 255 }).withMessage('tile la chuoi phai tu 2 - 255 ky tu')
            .trim(),
        body('isbn')
            .exists()
            .notEmpty().withMessage('khong duoc bo trong')
            .isLength({ min: 10, max: 13 }).withMessage('chuoi phia tu 10 - 13 ky tu'),
        body('publishYear')
            .optional()
            .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('publishYear khong hop le')
            .toInt(),
        body('authorId')
            .optional({ nullable: true })
            .toInt()
            .isInt({ min: 1 }).withMessage('id author phai la so nguyen duong')
            .custom(async (authorId) => {
                if (!authorId) return true; // null thì bỏ qua
                const author = await Author.findByPk(authorId);
                if (!author) {
                    throw new Error('author Id khong hop le');
                }
                return true;
            }),

        body('genreIds')
            .optional()
            .isArray().withMessage('genreIds phai la mang')
            .custom(async (genreIds) => {
                // const genreId = await Genre.findAll(genreIds) ;
                if (genreIds.length === 0) { // cho phep mang rong
                    return true;

                }
                for (let id of genreIds) {
                    if (!Number.isInteger(id) || id <= 0) {
                        throw new Error('genreIds phải là mảng số nguyên dương');
                    }
                }


                const count = await Genre.findAll({
                    where: { id: genreIds }
                });
                if (count !== genreIds.length) {
                    throw new Error('GenreId khong ton tai')
                }
                return true;
            })


    ]
}

const bookIdParamValidation = () => {
    return [
        param('id')
            .notEmpty()
            .exists().withMessage('id la bat buoc')
            .toInt()
            .isInt({ min: 1 }).withMessage('id phai la so nguyen duong')
    ]
}
const updateBookValidationRules = () => {
    return [
        param('id')
            .exists()
            .toInt(),
        body('title')
            .optional()
            .isString()
            .isLength({ min: 2, max: 255 }).withMessage('title tu 2 - 255 ky tu ')
            .trim(),
        body('isbn')
            .exists()
            .notEmpty().withMessage('khong duoc bo trong')
            .isLength({ min: 10, max: 13 }).withMessage('chuoi phia tu 10 - 13 ky tu'),
        body('publishYear')
            .optional()
            .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('publishYear khong hop le')
            .toInt(),
        body('genreIds')
            .optional()
            .isArray().withMessage('genreIds phai la mang')
            .custom(async (genreIds) => {
                // const genreId = await Genre.findAll(genreIds) ;
                if (genreIds.length === 0) {
                    return true;

                }
                genreIds.forEach(id => {
                    if (!Number.isInteger(id) || id <= 0) {
                        throw new Error('genreIds phai la mang so nguyen duong')
                    }
                });


                const count = await Genre.findAll({
                    where: { id: genreIds }
                });
                if (count !== genreIds.length) {
                    throw new Error('GenreId khong ton tai')
                }
                return true;
            })
    ]
}
module.exports = {
    bookIdParamValidation,
    listBooksValidationRules,
    createBookValidationRules,
    updateBookValidationRules
}