require('dotenv').config(); // load bien moi truong
const express = require('express');
const app = express();
const authRoutes = require('./routers/authRouter.js') 
const productRoutes = require('./routers/productRouter.js');
const categoryRoutes = require('./routers/categoryRouter.js')
const userRouter = require('./routers/userRouter.js')
const requestLoggerMiddlewares = require('./middlewares/requestLogger.js')
const errorHandlerMiddlewares = require('./middlewares/errorHandler.js')
const db = require('./models') // import db cua models

const PORT = 5000;
app.use(requestLoggerMiddlewares)
app.use(express.json());



app.use('/api/auth' ,authRoutes)
app.use('/api', productRoutes);
app.use('/api/category', categoryRoutes)
app.use('/user', userRouter) ;
app.use(errorHandlerMiddlewares);

db.sequelize.authenticate()
    .then(() => {
        console.log('ket noi thanh cong')
    })
    .catch((error) => {
        console.log('ko the ket noi du lieu', error)
    })



app.listen(PORT, () => {
    console.log(`Su kien lang nghe tai http://localhost: ${PORT}`);
})  
