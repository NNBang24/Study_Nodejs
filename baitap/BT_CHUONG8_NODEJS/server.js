require('dotenv').config()
const express = require('express') ;
const app = express() ;
const authRouter = require('./routers/authRouter')
const postRouter = require('./routers/postRouter')

const db = require('./models');
const requestLoggerMiddlewares = require('./middlewares/requestLogger');
const errorHandlerMiddlewares = require('./middlewares/errorHandler');


const PORT = 3000  ;

app.use(requestLoggerMiddlewares)
app.use(express.json())

app.use('/api/auth' ,authRouter )
app.use('/api/post' ,postRouter )
app.use(errorHandlerMiddlewares)
db.sequelize.authenticate()
    .then( () => {
        console.log('database ket noi thanh cong')
    })
    .catch((error) => {
        console.log('ko the ket noi du lieu', error)
    })


app.listen(PORT ,() => {
    console.log(` Su kien lang nghe tai http://localhost:${PORT}`)
})

