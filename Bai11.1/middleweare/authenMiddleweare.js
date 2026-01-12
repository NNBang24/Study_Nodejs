const { User } = require('../model');


const authenticate = async (req, res ,next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findByPk(req.session.userId);

            if (!user) {
                req.session.destroy(err => {
                    if (err) {
                        console.error("error destroying invalid session", err);
                    }
                    res.status(401).json({ message: "unauthorized : invalid session .Please login again" });
                })
            }
            else {
                req.user = user;
                next()
            }
        
        } catch (error) {
            console.error("server error during authentication" , error)
            res.status(500).json({message : "server error during authentication"})
        }
    }
    else {
        res.status(401).json({message : "unAuthenticate : Please login again "})
    }
}

module.exports = {
    authenticate
}