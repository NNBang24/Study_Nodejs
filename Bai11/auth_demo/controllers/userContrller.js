const { User, Profile } = require('../models');


const login = async (req , res) => {
    const {username , password} = req.body ;
    if(!username || !password) {
        return res.status(400).json({message : "username and password are required. !"} );

    } 
    try {
        const user = await User.scope("withPassword").findOne({
            where : {
                username : username ,

            }
        })
        if(!user) {
            return res.status(401).json({message :"invalid username or password"})
        }
        if(!(user.password === password)) {
             return res.status(401).json({message :"invalid username or password"})
        }
        req.session.userId = user.id;

        res.status(200).json({message :"login successfull !!"})
    } catch (error) {
        console.error("login error : " , error);
        res.status(500).json({message : "server error during login"})
    }
};

const logout = (req ,res ) => {
     if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error logout : ", err);
                return res.status(500).send({ message: "could not logout" })
            }

            res.clearCookie("connect.sid");
            res.json({ message: " logout successfuly" });
        }) // huy 
    } else {
        res.json({ message: "no acctive seddion logout" })
    }
};

const getDashboardInfo = async ( req , res ) => {
    res.status(200).json({message : "welcom to the dashboard" , user : req.user})
};

module.exports = {
    login ,
    logout ,
    getDashboardInfo
}