// Xử lý ảnh tải lên bằng sharp để resize, chuyển định dạng và dọn dẹp file tạm.

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { error } = require('console');


exports.resizeImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const tempFilePath = req.file.path;
    try {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); /// 16000333332-1313131
        const ext = '.jpeg';
        const finalFilename = `image-${uniqueSuffix}${ext}`;
        req.file.processedFilename = finalFilename;

        const finalDirectory = path.join(__dirname, "..", "public", "uploads");
        const finalFilePath = path.join(finalDirectory, finalFilename);

        await sharp(tempFilePath)
            .resize(1000) // 1000px
            .toFormat('jpeg') // convert jpeg
            .jpeg({ quality: 80 }) // tu 1 - 1000 
            .toFile(finalFilePath);
        fs.unlink(tempFilePath, (err) => { // xoa file temp 
            if (err) {
                console.error("loi khi xoa file temp", tempFilePath, err);
            }
            else {
                console.log('xoa file temp than cong', tempFilePath)
            }

        })
        next()
    } catch (error) {
        console.error("loi khi su ly anh :", error);
        // khi xay ra loi thi minh cung xoa file temp , de nguoi dung cap nhat lai anh
        fs.unlink(tempFilePath, (err) => { // xoa file temp 
            if (err) {
                console.error("loi khi xoa file temp", tempFilePath, err);
            }
            else {
                console.log('xoa file than cong', tempFilePath)
            }

        })
        next(error) ;
    }
}