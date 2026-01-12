const { User } = require('../model') ;

const login = async(req , res) => {
    const {username , password} = req.body ;
    if( !username || !password) {
        return res.status(400).json({message : "username and password are required"})
    } 
    try {
        const user = await User.scope('withPassword').findOne(
            {
                where : {
                    username : username ,
                
                }
            }
        )
        if(!user) {
            return res.status(401).json({ message: "Thong tin dang nhap khong chinh xac"})
        }
        if(!user.password === password) {
            return res.status(401).json({ message: "Thong tin dang nhap khong chinh xac" })
        }
        req.session.userId = user.id ;
        res.status(200).json({message : "Dang nhap thanh cong"})
    } catch (error) {
        console.error("login error" , error) ;
        res.status(500).json({message : "loi server khi dang nhap"})
    }
} ;


const logout = async(req , res ) => {
    if (req.session) {
        return req.session.destroy(err => {
            if (err) {
                console.error("error logout" ,err);
                return res.status(500).send("could not logout session");
            };
            res.clearCookie("connect.sid");
            return res.json({ message: "session logout successfully" });

        })
    }
    return res.json({ message: " no active session to logout" })
} ;


const getDashboardInfo = async ( req , res) => {
    res.status(200).json({
        message : "chao mung den dashboard" ,
        user : req.user ,

    })
} ;

module.exports = {
    login , 
    logout , 
    getDashboardInfo
}
