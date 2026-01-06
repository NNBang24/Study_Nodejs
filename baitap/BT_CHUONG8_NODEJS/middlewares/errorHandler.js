function errorHandlerMiddlewares(error , req , res , next) {
    console.error( `Error : ${error.stack}`) ;
    res.status(500).send('loi server vui long thu lai sau');

}
module.exports = errorHandlerMiddlewares;