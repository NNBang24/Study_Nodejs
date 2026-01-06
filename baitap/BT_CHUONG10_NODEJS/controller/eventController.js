const { Event } = require('../models');

exports.createEvent = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Tải ảnh thất bại' });
    }

    try {
        const avatarPath = `/uploads/${req.file.processedFilename}`;
        const userId = req.user.userId;
        const newEvent = await Event.create({
            title: req.body.title,
            image: avatarPath,
            userId: userId // chắc chắn có giá trị
        });

        res.status(201).json({
            message: 'Tạo event thành công',
            event: newEvent
        });
    } catch (error) {
        next(error);
    }
};

exports.getEvents = async (req, res, next) => {
    try {

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Token khong hop le hoac chua dang nhap' });
        }

        const events = await Event.findAll({
            where: { userId: req.user.id }
        });

        res.status(200).json(events);
    } catch (err) {
        next(err);
    }
};
