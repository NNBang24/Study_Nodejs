const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { User, Sequelize } = require('../models');
const { param } = require('../routers/userRouter');
const e = require('express');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const saltRound = 10; // do phuc tap cua chuoi hash

        // thuat toan hash password 
        const hashedPassword = await bcrypt.hash(password, saltRound);

        // tao user moi 
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        // sau khi tao xong tra ve cho nguoi dung respone
        // return tra ve cho nguoi dung 
        const userRespone = await User.findByPk(newUser.id);


        res.status(201).json({ message: 'Dang ky thanh cong', user: userRespone })

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(409).json({
                message: "loi dang nhap ",
                error: [
                    {
                        msg: `${field} da ton tai`,
                        param: field
                    }
                ]
            })
        } // day la dieu kien de check la  ten san pham da ton tai tren
        // xu ly loi validation 
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => ({ msg: err.message, param: err.path }));
            return res.status(400).json({ message: 'du lieu khong hop le ', error: messages })
        }
        next(error)

    }
}

exports.login = async (req, res, next) => {
    try {
        const { emailOrUsername, password } = req.body;

        // lay mat khau ra
        const user = await User.scope('withPassword').findOne(
            {
                where: {
                    [Sequelize.Op.or]: [
                        {
                            email: emailOrUsername
                        },
                        {
                            username: emailOrUsername
                        }
                    ]
                }
            }
        );
        if(!user) {
            return res.status(401).json({message : 'thon tin dang nhap khong chinh xac'});

        }
        // query thanh cong password co khop voi nhau khong
        const isMatch = await bcrypt.compare(password, user.password) ;
        // cai nay password se path no ra va so sanh coi co giong nhua khong

        if( !isMatch) {
              return res.status(401).json({message : 'mat khau dang nhap khong chinh xac'}); // chekc password khong khop 
        }
        // bay gio password no khop thi  , su dung token
        const payload = {
            userId : user.id
        }
        const secretKey = process.env.JWT_SECRET ;
        const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

        const token  = jwt.sign(payload , secretKey , {expiresIn : expiresIn}) ;
        // goi token cho clint server 

        res.json({
            message: "dang nhap thanh cong",
            token : token ,
            user : {
                id : user.id ,
                username : user.username ,
                email : user.email ,
                role : user.role 
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.getMe = async(req,res,next) => {
    res.json({user : req.user});
}