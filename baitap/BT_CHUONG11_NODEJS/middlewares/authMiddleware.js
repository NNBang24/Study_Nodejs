const { User } = require('../models');

const authenticate = async (req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findByPk(req.session.userId);
            if (!user) {
                req.session.destroy(err => {
                    if (err) console.error("error destroy invalid session", err);
                    return res.status(401).json({ message: "Unauthorized: invalid session. Please login again" });
                });
            } else {
                req.user = user;
                next();
            }
        } catch (error) {
            console.error("server error during authentication", error);
            res.status(500).json({ message: "server error during authentication" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized: please login again" });
    }
};

module.exports = authenticate;
