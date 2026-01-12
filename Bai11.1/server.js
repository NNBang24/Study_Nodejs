require('dotenv').config();
const express = require('express');
const app = express();
const sessionRouter = require('./router/sessionRouter')
const authRouter = require('./router/authRouter.js')
const db = require('./model/index.js'); // import db cua models
const session = require('express-session')
const cookieParser = require('cookie-parser');

const MySQLStore = require('express-mysql-session')(session);

const config = require('./config/config')
const PORT = 3000;
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
app.get('/set-cookie', (req, res) => {
    res.cookie("username", "guest");
    res.cookie("language", "vietnamese", { maxAge: 1000 * 60 * 15 });
    res.cookie("data", "someToken123", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });
    res.json({ message: "cookie have been set " });
})

app.get('/read-cookie', (req, res) => {
    const username = req.cookies.username;
    const language = req.cookies.language;
    const data = req.cookies.data;

    console.log("cookie :", req.cookies);
    res.json(
        { message: "get cookie" }
    )
})

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('language');
    res.clearCookie('data', {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    res.json({ message: "clear cookie" });

});
app.use('/api/auth', authRouter)
app.use('/api/session',
    sessionRouter
)

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

