class HttpError extends Error { // we are making use of Error predefined class to make our own error handling model
    constructor(message,errorCode){
        super(message);
        this.code = errorCode
    }
}

module.exports = HttpError;