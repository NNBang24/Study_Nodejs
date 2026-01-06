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
    // console.log("Controller : update mt avatar");
    // console.log( "req.user" ,req.user) ;
    // console.log("req.file" , req.file)
    if (!req.file || !req.file.processedFilename) {
        return res.status(400).json({ message: 'Tải ảnh hoặc xử lý ảnh thất bại.' });
    }
    try {
        const avatarPath = `/uploads/${req.file.processedFilename}`;
        await User.update(
            { avatar: avatarPath },
            {
                where: {
                    id: req.user.id
                }
            }
        );
        res.status(200).json(
            {
                message: 'Cập nhật avatar thành công!',
                data: {
                    avatarUrl: avatarPath
                }
            }
        )
    } catch (error) {
        next(error)
    }
};

