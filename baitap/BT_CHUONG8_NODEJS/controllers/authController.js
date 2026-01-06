    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const { User, Sequelize } = require('../models');


    exports.register = async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const saltRounds = 10;// do phuc tap cua hash pass
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            //hash roi gio tao tai khoan
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword
            });
            // loai bo password nho defaultScope

            // const userResponse = newUser.toJSON()

            // day la loai password ra khi dang ky thanh cong
            const userResponse = await User.findByPk(newUser.id);
            res.status(201).json({ message: 'Dang ky thanh cong', user: userResponse })

        } catch (error) {
            // console.log(error.name)
            // throw new Error('TEST ERROR');
            if (error.name === 'SequelizeUniqueConstraintError') {
                const field = error.errors[0].path;
                return res.status(409).json({
                    message: 'loi dang ky',
                    error: [
                        {
                            msg: `${field} Da ton tai`,
                            param: field
                        }
                    ]
                })
            }
            if (error.name === 'SequelizeValidationError') {
                const messages = error.errors.map(err => ({ msg: err.message, param: err.path }));
                return res.status(400).json({ message: 'du lieu khong hop le', error: messages })
            }
            next(error)

        }
    }

    exports.login = async (req, res, next) => {
        try {
            const { emailOrUsername, password } = req.body;

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
            if (!user) {
                return res.status(401).json({ message: "thong tin dang nhap khong dung" })
            }

            // kiem tra neu thanh cong
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "thong tin dang nhap khong dung" })
            }

            const payload = {
                userId: user.id
            };

            const secretKey = process.env.JWT_SECRET;
            const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

            const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
            res.json({
                message: 'Dang nhap thanh cong' ,
                token : token  ,
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

    exports.getMe =async(req , res , next) => {
        res.json({user : req.user})
    }