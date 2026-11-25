
const { body, validationResult } = require('express-validator');

const bookValidationRules = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),

    body('author')
        .trim()
        .notEmpty()
        .withMessage('Author is required'),

    body('category')
        .notEmpty()
        .withMessage('Category is required'),

    body('ISBN')
        .trim()
        .notEmpty()
        .withMessage('ISBN is required'),

    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be 0 or greater'),

    body('stock')
        .isInt({ min: 0 })
        .withMessage('Stock must be 0 or greater'),

    body('publishedYear')
        .isInt()
        .withMessage('Valid published year is required')
];

const validateBook = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    bookValidationRules,
    validateBook
};
