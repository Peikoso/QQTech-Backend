export const ErrorMiddleware = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(err.status).json({ error: err.message });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(err.status).json({ error: err.message });
    }
    if (err.name === 'NotFoundError') {
        return res.status(err.status).json({ error: err.message });
    }
    if (err.name === 'BusinessLogicError') {
        return res.status(err.status).json({ error: err.message });
    }

    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error.' });
}