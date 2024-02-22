// authMiddleware.js

// Authentication middleware
exports.isAuthenticated = (req, res, next) => {
    // Check if user is authenticated
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware
        next();
    } else {
        // User is not authenticated, redirect to login page or send unauthorized response
        res.redirect('/auth/login'); // You can customize this behavior as needed
    }
};
