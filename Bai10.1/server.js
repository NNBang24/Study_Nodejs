const path = require('path')

const helmet = require('helmet')
// gioi han truy cap 
const rateLimit = require('express-rate-limit')
require('dotenv').config(); // load bien moi truong
const express = require('express');
const app = express();
const authRoutes = require('./routers/authRouter.js')
const productRoutes = require('./routers/productRouter.js');
const categoryRoutes = require('./routers/categoryRouter.js')
const userRouter = require('./routers/userRouter.js')
const requestLoggerMiddlewares = require('./middlewares/requestLogger.js')
const errorHandlerMiddlewares = require('./middlewares/errorHandler.js')
const db = require('./models/index.js'); // import db cua models
const { maxHeaderSize } = require('http');

const PORT = 5000;
app.use(requestLoggerMiddlewares);

app.use(helmet());
const limiter = rateLimit({
    max: 100, // limit moi cai IP den 100 cai req tren moi cai window ;
    windowMs: 15 * 60 * 1000, //  m/s 
    message: " Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút!",
    standardHeaders: true,
    legacyHeaders: false
})
app.use('/api' ,limiter)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());



app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes)
app.use('/api/user', userRouter);
app.use(errorHandlerMiddlewares);

db.sequelize.authenticate()
    .then(() => {
        console.log('ket noi thanh cong')
    })
    .catch((error) => {
        console.log('ko the ket noi du lieu', error)
    })



app.listen(PORT, () => {
    console.log(`Su kien lang nghe tai http://localhost:${PORT}`);
})  
