const { request } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Yeu cau Token xac thuc' });

    }
    // neu nhu co token ma hoa no ra
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodePayload) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Token het han' })
            }
            return res.status(403).json({ message: 'Token khong hop le' });
        }
        const userId = decodePayload.userId;
        if (!userId) {
            return res.status(403).json({ message: 'Token khong hop le ( thieu thong tin )' })
        }
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(401).json({ message: "Xac thuc that bai (Nguoi dung khong ton tai" });

            }
            req.user = user;
            next()
        } catch (bdError) {
            console.error("loi truy van nguoi dung trong Authenticate Token" , bdError  );
            next(bdError) ;


        }

    })

}

module.exports = authenticateToken ;
