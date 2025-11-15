const express = require('express');
const productRouters =require('./routers/productRouter');
const requestLoggerMiddlewares = require('./middlewares/requestLogger.js');
const errorHanldeMiddlewaers = require('./middlewares/errorHandler.js')

const app = express();
const PORT = 3000;
app.use(requestLoggerMiddlewares)
app.use(express.json());
app.use('/api' , productRouters) ;
app.use(errorHanldeMiddlewaers);


app.listen(PORT, () => {
    console.log(`server lang nghe tai http://localhost: ${PORT}`);
})  