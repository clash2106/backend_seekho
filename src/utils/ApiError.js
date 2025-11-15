//now I want ot make a standarized syntax for handling the errors in the api
class ApiError extends Error{
    constructor(statusCode,
        message = "Something went wrong",
        error =[],
        stack = "",
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.data =null;
        this.success = false;
        this.errors = errors;

        if(stack){
            this.stack =stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export {ApiError};
//we will use this class to create error objects in our routes and middlewares
