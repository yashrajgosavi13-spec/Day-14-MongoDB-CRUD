
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Internal Server Error';

    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 400;
        message = 'ISBN already exists';
    }

    // Invalid MongoDB ID
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid book ID';
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message);
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;
