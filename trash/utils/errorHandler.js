class ExtendableError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends ExtendableError {
    constructor(message = 'Resource Not Found') {
        super(404, message);
    }
}

class BadRequestError extends ExtendableError {
    constructor(message = 'Bad Request') {
        super(400, message);
    }
}

class InternalServerError extends ExtendableError {
    constructor(message = 'Internal Server Error') {
        super(500, message);
    }
}

// Central Error Handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status);
    res.json({
        status: status,
        message: message
    });
}

module.exports = {
    errorHandler,
    NotFoundError,
    BadRequestError,
    InternalServerError
};
