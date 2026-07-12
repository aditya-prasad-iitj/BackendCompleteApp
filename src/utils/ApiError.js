class ApiError extends Error{
    constructor(statusCode, message="Something Went Wrong", error=[], stack=""){
        super(message);
        this.message = message;
        this.error = error;
        this.data = null;
        this.success = false;
        this.statusCode = statusCode;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}