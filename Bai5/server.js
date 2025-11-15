require('dotenv').config(); // load bien moi truong
const express = require('express');
const app = express();
const productRoutes = require('./routers/productRouter.js');
const categoryRoutes = require('./routers/categoryRouter.js')
const userRouter = require('./routers/userRouter.js')
const requestLoggerMiddelwares = require('./middelwares/requestLogger.js')
const errorHandlerMiddelwares = require('./middelwares/errorHandler.js')
const db = require('./models') // import db cua models

const PORT = 5000;
app.use(requestLoggerMiddelwares)
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api/category', categoryRoutes)
app.use('/user', userRouter) ;
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
