
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Home Route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Library Management API',
        status: 'Server is running'
    });
});

// Book Routes
app.use('/api/books', bookRoutes);

// Error Handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
