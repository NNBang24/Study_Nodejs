require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models/index.js');

const authRoutes = require('./routers/authRouter.js') ;
const cartRoutes = require('./routers/cartRoutes.js')
const session = require('express-session');

const cookieParser = require('cookie-parser')

const MySQLStore = require('express-mysql-session')(session);


const config = require('./config/config.js')
const PORT = 5000;
app.use(express.json());

app.use(cookieParser());

const dataConfig = config[config.env];

const sessionStoreOptions = {
    host: dataConfig.host,
    port: dataConfig.port,
    password: dataConfig.password,
    user: dataConfig.username,
    database: dataConfig.database,
    clearExpired: true,
    // checkExpirationInterval
    checkExpirationInterval: 1000 * 60 * 10,
    expiration: 1000 * 60 * 60 * 24,
    createDatabaseTable: false
}
const sessionStore = new MySQLStore(sessionStoreOptions);

app.use(session({
    secret: config.sessionSecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production'
    }
}))

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
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

