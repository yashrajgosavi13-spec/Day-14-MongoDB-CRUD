
const express = require('express');
const router = express.Router();

const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

const {
    bookValidationRules,
    validateBook
} = require('../middleware/validator');

// GET all books with search, filter, sorting and pagination
router.get('/', getBooks);

// GET single book by ID
router.get('/:id', getBookById);

// CREATE book with validation
router.post('/', bookValidationRules, validateBook, createBook);

// UPDATE book
router.put('/:id', bookValidationRules, validateBook, updateBook);

// DELETE book
router.delete('/:id', deleteBook);

module.exports = router;
