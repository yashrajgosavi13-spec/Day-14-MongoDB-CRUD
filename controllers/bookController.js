
const Book = require('../models/Book');

// @desc Get all books with search, filter, sorting and pagination
// @route GET /api/books
const getBooks = async (req, res, next) => {
    try {
        const {
            search,
            category,
            sortBy,
            order,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        // Search by title
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Sorting
        const sort = {};

        if (sortBy === 'price' || sortBy === 'publishedYear') {
            sort[sortBy] = order === 'desc' ? -1 : 1;
        }

        const currentPage = Math.max(1, parseInt(page) || 1);
        const perPage = Math.min(100, Math.max(1, parseInt(limit) || 10));

        const books = await Book.find(query)
            .sort(sort)
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        const totalBooks = await Book.countDocuments(query);

        res.status(200).json({
            success: true,
            totalBooks,
            currentPage,
            totalPages: Math.ceil(totalBooks / perPage),
            books
        });

    } catch (error) {
        next(error);
    }
};


// @desc Get single book by ID
// @route GET /api/books/:id
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            book
        });

    } catch (error) {
        next(error);
    }
};


// @desc Create new book
// @route POST /api/books
const createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            book
        });

    } catch (error) {
        next(error);
    }
};


// @desc Update book
// @route PUT /api/books/:id
const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            book
        });

    } catch (error) {
        next(error);
    }
};


// @desc Delete book
// @route DELETE /api/books/:id
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully'
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
