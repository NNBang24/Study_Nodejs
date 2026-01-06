const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
// const { Op } = require('sequelize')
const { User , Sequelize} = require('../models');
const { param } = require('../../Bai10/routers/userRouter');
const e = require('express');
const user = require('../models/user');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const saltRounds = 10;
        // hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        // const userResponse = newUser.toJSON();
        const userResponse = await User.findByPk(newUser.id);
        res.status(201).json({ message: 'Dang ky thanh cong', user: userResponse })
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(409).json({
                message: "Loi Dang Ky",
                error: [
                    {
                        msg: `${field} Da ton tai`,
                        param: field
                    }
                ]
            })
        } // day la dieu kien de check la  ten san pham da ton tai tren

        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => ({ msg: err.message, param: err.path }));
            return res.status(400).json({ message: 'du lieu khong hop le', error: messages })
        }
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { emailOrUsername, password } = req.body
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
            return res.status(401).json({message : 'Thong tin dang nhap khong chinh xac'});

        }
        // kiem tra neu thanh cong
        const isMatch = await bcrypt.compare(password , user.password) // So sánh pass coi co giong khonf
        if(!isMatch) {
            return res.status(401).json({ message: 'Thong tin dang nhap khong chinh xac' });
        }

        const payload = {
            userId : user.id

        };
        const secretKey = process.env.JWT_SECRET  ;
        const expiresIn = process.env.JWT_EXPIRES_IN  || '1h';

        const token = jwt.sign(payload, secretKey , {expiresIn  : expiresIn}) ;

        res.json({
            message : 'Dang nhap thanh cong' ,
            token : token ,
            user : {
                id : user.id ,
                username: user.username ,
                email : user.email ,
                role : user.role 
            },
            
        })
    } catch (error) {
        next(error)
    }
}

exports.getMe = async(req , res , next)  => {
    res.json({user : req.user})
}