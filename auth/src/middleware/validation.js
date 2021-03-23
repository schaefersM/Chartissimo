function validation (schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorValue = error.details[0].message.split('"')[1];
            return res.status(400).json({
                errorMessage: error.details[0].message.replace(
                    `"${errorValue}"`,
                    errorValue
                ),
            });
        } else {
            next();
        }
    };
}

module.exports = validation;
