const routeNotFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: '404: Page not found on server',
    });
};

module.exports = routeNotFoundHandler;