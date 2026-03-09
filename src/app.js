const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/error.middleware');

// Import routes
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.get('/api/v0', (_req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the API' });
});
app.get('/api/v0/health', (_req, res, next) => {
    try {
        res.status(200).json({ success: true, message: 'Health check passed' });
    } catch (err) {
        next(err);
    }
});

app.use('/api/v0/auth', authRouter);
app.use('/api/v0/user', userRouter);

app.use(errorMiddleware);

module.exports = app;
