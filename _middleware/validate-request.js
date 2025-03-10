module.exports = validateRequest;

function validateRequest(req, nect, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation erro:  ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}