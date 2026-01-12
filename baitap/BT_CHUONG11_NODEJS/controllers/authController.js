const { User } = require('../models');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "username and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Register success", userId: user.id });
    } catch (error) {
        console.error("register error", error);
        res.status(500).json({ message: "server error during register" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.scope("withPassword").findOne({
        where: { username }
    });

    if (!user) {
        return res.status(401).json({ message: "invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "invalid username or password" });
    }

    req.session.userId = user.id;
    res.json({ message: "login success" });
};


const logout = (req ,res ) => {
     if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error logout : ", err);
                return res.status(500).send({ message: "could not logout" })
            }

            res.clearCookie("connect.sid");
            res.json({ message: " logout successfully" });
        }) // huy 
    } else {
        res.json({ message: "no active seddon logout" })
    }
};

const getDashboardInfo = async ( req , res ) => {
    res.status(200).json({message : "welcome to the dashboard" , user : req.user})
};

module.exports = {
    register ,
    login ,
    logout ,
    getDashboardInfo
}