const multer = require('multer');
const path = require('path');

// Xử lý tải file với multer , bao gồm lưu trữ, lọc file và giới hạn kích thước.

const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const tampPath = path.join(__dirname, "..", "public", "temp")
        callback(null, tampPath)
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); /// 16000333332-1313131
        const ext = path.extname(file.originalname); // lay duoi jpg , png
        callback(null, `image-${uniqueSuffix}${ext}`);// image-16000333332-1313131.png

    }
})

// loc coi thu phai la file image 

const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    }
    else {
        callback(new Error('Không phải ảnh! Vui lòng chỉ tải lên file ảnh.') , false)
    }

};
// khoi tao lien ket voi cac
const upload = multer({
    storage: multerStorage ,
    fileFilter : multerFilter ,
    limits : { // gioi han kich thuoc
        fileSize : 5 * 1024 * 1024 // 5MB
    }
})


exports.uploadSingleImage = (fieldName) => upload.single(fieldName) 