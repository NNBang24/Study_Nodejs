const express = require('express');
const path = require('path');

const app = express();
const eventRouter = require('./router/eventRouter')
const authRouter = require('./router/authRouter')
const db = require('./models/index')

const POST = 3000;
// Trỏ trực tiếp vào thư mục uploads ở gốc dự án
app.use('/uploads', express.static(path.join(__dirname, 'public', 'upload')));

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/event',eventRouter ) 

db.sequelize.authenticate()
    .then(() => {
        console.log('ket noi thanh cong')
    })
    .catch((error) => {
        console.log('ko the ket noi du lieu', error)
    })
app.listen(POST, () => {
    console.log(`su kien dang lang nghe tai http://localhost:${POST}`)
})