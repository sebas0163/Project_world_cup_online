var allowedOrigins = require('../config/allowedOrigins');

/**
 * If the origin of the request is in the allowedOrigins array, then set the
 * Access-Control-Allow-Credentials header to true.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;