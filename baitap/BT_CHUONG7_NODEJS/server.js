require('dotenv').config();

const express = require('express');
const app = express();
const taskRouter = require('./routers/taskRoutes.js')
const db = require('./models/index.js'); // import db cua models 
const errorHandlerMiddlewares = require('./middlewares/errorHandler.js');


const PORT = 3000;
app.use(express.json());
app.use('/api/task' , taskRouter )
app.use(errorHandlerMiddlewares)
db.sequelize.authenticate()
    .then(() => {
        console.log('ket noi thanh cong database ')
    })
    .catch((error) => {
        console.log('ko the ket noi du lieu database ', error)
    })
app.listen(PORT, () => {
    console.log(`Su kien lang nghe tai http://localhost:${PORT}`)
})

