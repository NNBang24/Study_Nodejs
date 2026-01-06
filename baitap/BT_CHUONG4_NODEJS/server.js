const express = require('express');
const categoryRouter = require('./routers/categoryRouter');
const requestLoggerMiddlewares = require('./middlewares/requestLogger')
const errorHandlerMiddleware = require('./middlewares/errorHandles')


const app = express() ;
const PORT = 3000 ;
app.use(requestLoggerMiddlewares);
app.use(express.json())

app.use('/category' , categoryRouter) ;
app.use(errorHandlerMiddleware);
 
app.listen(PORT,() => {
    console.log(`Server dang lang nghe http://localhost:${PORT}`);
})