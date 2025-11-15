//Without asyncHandler, every async route would need its own try...catch

//This function takes a requestHandler function as input
//and returns a new function that wraps the original function in a Promise
 const asyncHandler = (requestHandler) => {
  //the returned function is a middleware function that takes req, res, next as arguments
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
    .catch((err) => next(err));
  };
};

export {asyncHandler};

//as arrow function is a higher order function
//it takes a function as input and returns a function as output
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

/*
const asyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next); 

    } catch (error) {
        //.status is used to set the HTTP status  code of the response
        //set only the code and not send the response
        //we will send the response in json format using .json()
        //500 is the status code for internal server error
        res.status(err.code || 500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
}
*/
