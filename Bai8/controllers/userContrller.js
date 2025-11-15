const { User, Profile } = require('../models');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Profile,
                as: 'profile'
            }]
        })
        res.json(users);
    } catch (error) {
        next(error)
    }
}