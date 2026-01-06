const sharp = require('sharp');
const path = require('path');

const fs = require('fs');

exports.resizeImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const tempFilePath = req.file.path;
    try {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = '.jpeg';
        const finalFilename = `image-${uniqueSuffix}${ext}`;
        req.file.processedFilename = finalFilename;

        const finalDirectory = path.join(__dirname, "..", "public", "upload");
        const finalFilePath = path.join(finalDirectory, finalFilename)

        await sharp(tempFilePath)
            .resize(1200)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(finalFilePath);
        fs.unlink(tempFilePath, (err) => {
            if (err) {
                console.log("loi khi xoa file temp", tempFilePath, err);
            }
            else {
                console.log("file temp xoa thanh cong", tempFilePath);
            }
        })
        next()

    } catch (error) {
        console.error('loi khi xu ly anh ', error);
        fs.unlink(tempFilePath, (err) => {
            if (err) {
                console.log("loi khi xoa file temp", tempFilePath, err);
            }
            else {
                console.log("file temp xoa thanh cong", tempFilePath);
            }
        })
        next(error);
    }
}