exports.triggerError = (req, res, next) => {
    throw new Error('intentional server error for testing')
};