require('dotenv').config() ;// load bien moi truong
const express = require('express') ;
const app = express() ;
const bookRouter = require('./router/bookRouter.js')
const requestLoggerMiddelwares = require('./middelwares/requestLogger.js')
const errorHandlerMiddelwares = require('./middelwares/errorHandle.js')
const db = require('./models/index.js');


const PORT = process.env.PORT || 6000 ;
app.use(requestLoggerMiddelwares);
app.use(express.json());
app.use('/api/book' , bookRouter) ;
app.use(errorHandlerMiddelwares) ;


db.sequelize.authenticate()
.then(() => {
    console.log('ket noi thanh cong')
})
.catch((err) => {
    console.log('khong the ket noi du lieu' ,err)
})

app.listen(PORT ,() => {
    console.log(`server lang nghe tai http://localhost:${PORT}`);
})
