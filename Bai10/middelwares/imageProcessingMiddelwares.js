const sharp = require('sharp');

const path = require('path');

const fs = require('fs');

exports.resizeImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const tempFilePath = req.file.path;
    try {
        const uniqueSuffix = Date.now() + "-" + (Math.random() * 1e9); // 1670000000 - 123456789
        const ext = '.jpeg';

        const finalFileName = `image - ${uniqueSuffix} ${ext}`;
        req.file.processedFilename = finalFileName;


        const finalDirectory = path.join(__dirname, "..", "public", "uploads");

        const finalfilePath = path.join(finalDirectory, finalFileName);


        await sharp(tempFilePath)
            .resize(1000) // 1000px
            .toFormat("jpeg")
            .jpeg({ quality: 80 })
            .toFile(finalfilePath)
        // xoa fiel temp
        fs.unlink(tempFilePath, (err) => {
            if (err) {
                console.error("loi khi xoa file :", tempFilePath, err);
            }
            else {
                console.log("da xoa file temp :", tempFilePath)
            }
        })
        next()
    } catch (error) {
        console.error("loi khi xu li anh", error);
        fs.unlink(tempFilePath, (err) => {
            if (err) {
                console.error("loi khi xoa file :", tempFilePath, err);
            }
            else {
                console.log("da xoa file temp :", tempFilePath)
            }
        })
        next(error);

    }
}