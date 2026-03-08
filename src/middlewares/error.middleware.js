const errorMiddleware = (err, _req, res, _next) => {
    console.error('middleware error:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ success: false, message });
};

module.exports = errorMiddleware;
