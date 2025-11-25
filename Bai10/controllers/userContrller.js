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

    exports.updateMyAvatar = async (req, res, next) => {
        // console.log("controller : updateMyAvatar") ;
        // console.log("req.user" , req.user) ;
        // console.log("req.file" , req.file) ;    

        if (!req.file || !req.file.processedFilename) {
        return   res.status(400).json({ message: "lam on dang anh bang file" })
        }

        try {
            const avatarPath = `/uploads/${req.file.processedFilename}`;
            const updateUser = await User.update(
                { avatar: avatarPath },
                { where: { id: req.user.id } }
            )
            res.status(200).json({
                message: " avatar update successfully!",
                data: {
                    avatarUel: avatarPath
                }

            })
        } catch (error) {
            next(error)
        }

    }