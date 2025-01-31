const errorHandler = {
    errorHandlers: (err, req, res, next) => {
        console.log(err);

        res.status(500).json({ message: err.message });

    },

    handleNotFound: (req, res, next) => {
        res.status(404).json({ message: 'Not found' });
    },
};

module.exports = errorHandler;