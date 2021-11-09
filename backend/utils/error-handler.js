class ErrorHandler extends Error{

    constructor(message,statusCode)
    {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructor)
    }


    static serverError = (message='Something Went Wrong') =>
    {
       return new ErrorHandler(message,500);
    }


    static badRequest = (message='Bad Request') =>
    {
       return new ErrorHandler(message,400);
    }

    static notFound = (message='Resourse Not Found') =>
    {
        return new ErrorHandler(message,404);
    }

    static unAuthorized = (message='Unauthorized Access')=>
    {
        return new ErrorHandler(message,401);
    }
    
    static notAllowed = (message='Not Allowed')=>
    {
        return new ErrorHandler(message,403);
    }


}

module.exports = ErrorHandler;