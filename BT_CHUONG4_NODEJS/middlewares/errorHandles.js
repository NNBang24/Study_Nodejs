function errorHandlerMiddleware(err, req, res, next) {
    console.error(`Error: ${err.stack}`);
    res.status(500).send('Lỗi server, vui lòng thử lại sau !!!');
}

module.exports = errorHandlerMiddleware;
