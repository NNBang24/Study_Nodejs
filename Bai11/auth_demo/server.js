require('dotenv').config();
const express = require('express');
const app = express();

const sessionRouter = require('./routers/sessionRouter.js') ;
const authRouter = require('./routers/authRouter.js')

const session = require('express-session');

const cookieParser = require('cookie-parser')

const MySQLStore = require('express-mysql-session')(session);



const config = require('./config/config.js')
const PORT = 5000;
app.use(express.json());

app.use(cookieParser());

const dbConfig = config[config.env];
const sessionStoreOptions = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,

    clearExpired: true,                          // Xoá session cũ
    checkExpirationInterval: 1000 * 60 * 10,     // 10 phút dọn dẹp 1 lần
    expiration: 1000 * 60 * 60 * 24,             // session tồn tại 24h

    createDatabaseTable: false,                  // Tự tạo bảng hay không
};

const sessionStore = new MySQLStore(sessionStoreOptions)

// Middleware quản lý session trong Express
app.use(session({
    // Chuỗi bí mật dùng để ký session ID (bắt buộc phải bảo mật)
    secret: config.sessionSecret,

    // Lưu session vào MySQL thay vì bộ nhớ RAM
    store: sessionStore,

    // Không ghi lại session nếu không có thay đổi → giảm tải DB
    resave: false,

    // Không tạo session khi không có dữ liệu → hạn chế session rác
    saveUninitialized: false,

    // Cấu hình cookie lưu sessionID
    cookie: {
        httpOnly: true, // Chặn JS truy cập cookie → tăng bảo mật
        maxAge: 1000 * 60 * 60 * 24, // Session tồn tại 24h
        secure: process.env.NODE_ENV === 'production',
        // secure = true → chỉ gửi cookie qua HTTPS (chỉ bật khi deploy)
    }
}));


app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'guest');
    res.cookie('language', 'vietnamese', { maxAge: 1000 * 60 * 15 });
    res.cookie('data', 'someToken123', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    res.json({ message: 'cookie have been set !' });
});

app.get('/read-cookie', (req, res) => {
    const username = req.cookies.username;
    const language = req.cookies.language;
    const data = req.cookies.data;

    console.log("Cookies :", req.cookies);
    res.json({ message: "get cookie" })

});

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('language');
    res.clearCookie('data', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    res.json({
        message: " clear cookie"
    })
})

app.use('/api/session' ,sessionRouter) ;
app.use('/api/auth' , authRouter);


app.listen(PORT, () => {
    console.log(`Su kien lang nghe tai http://localhost: ${PORT}`);
})

