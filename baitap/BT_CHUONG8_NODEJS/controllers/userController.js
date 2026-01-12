const { User } = require("../models")

exports.getAllUsers = async(req , res , next) => {
    try {
        const users = await User.findAll(
            {
                attributes : {
                    exclude : ['password']
                }
            }
        ) ;
        res.json(users) ;
    } catch (error) {
        next(error) ;
    }
}


exports.changeRole = async (req, res) => {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Role khong hop le' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) return res.sendStatus(404);

    user.role = role;
    await user.save();

    res.json({
        message: 'Cap nhat role thanh cong',
        user
    }); 
};
