const commonErrorHandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        success: false,
        message:
            'An error occured, Please check the errorMessage key for more details',
        errorMessage: error.message,
    });
};


module.exports = commonErrorHandler;
