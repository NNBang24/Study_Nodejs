const multer = require('multer');

const path = require('path');
const fs = require('fs');
// Xử lý tải file với multer , bao gồm lưu trữ, lọc file và giới hạn kích thước.

const multerStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        const tempPath = path.join(__dirname, "..", "public", "temp");
        if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath, { recursive: true });
        }
        callBack(null, tempPath)  // callBack ( err , path)
    },
    filename: (req, file, callBack) => { // ten cua file name anh dang len 

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname) // lay duoi fiel anh nhu .jpg , png
        callBack(null, `image-${uniqueSuffix}${ext}`)
    }
})

// loc coi thu phai la file image 

const multerFilter = (req, file, callBack) => {
    if (file.mimetype.startsWith('image')) {
        callBack(null, true);
    }
    else {
        callBack(new Error('Không phải ảnh! Vui lòng chỉ tải lên file ảnh.'), false);

    }

}
// khoi tao lien ket voi cac fiel

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 4 * 1024 * 1024
    }
});

exports.upLoadSingleImage = ((fieldName) => {
    return upload.single(fieldName);
})