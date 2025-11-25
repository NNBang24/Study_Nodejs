const path = require('path')
require('dotenv').config(); // load bien moi truong
const express = require('express');
const app = express();
const authRouters = require('./routers/authRouter.js')
const productRoutes = require('./routers/productRouter.js');
const categoryRoutes = require('./routers/categoryRouter.js')
const userRouter = require('./routers/userRouter.js')
const requestLoggerMiddelwares = require('./middelwares/requestLogger.js')
const errorHandlerMiddelwares = require('./middelwares/errorHandler.js')

const db = require('./models/index.js') // import db cua models

const PORT = 5000;
app.use(requestLoggerMiddelwares)
app.use(express.static(path.join(__dirname , "public")))
app.use(express.json());


app.use('/api/auth' ,authRouters)
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes)
app.use('/api/user', userRouter) ;
app.use(errorHandlerMiddelwares);

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
