const e = require('express');
const multer = require('multer') ;
const path =require('path');


const multerStorage = multer.diskStorage({
    destination : (req,file , callback) => {
        const tempPath = path.join(__dirname ,".." ,"public" ,"temp") ;
        callback(null ,tempPath)
    },
    filename : (req , file , callback) => {
        const uniqueSuffix = Date.now() + "-" + (Math.random() * 1e9) ; // 1670000000 - 123456789
        const ext = path.extname(file.originalname) // .jpg or .png
        callback(null  , `image - ${uniqueSuffix} ${ext}`) // image-1670000000 - 123456789.png
    }
}) ;

const  multetFilter = (req , file , callback) => {
    if(file.mimetype.startsWith('image') ) {
        callback(null ,true) ;
    }
    else {
        callback(new Error("not an image ! please Upload only image") ,false)
    }
}


const upload =  multer({
    storage :multerStorage ,
    fileFilter : multetFilter ,
    limits : {
        fileSize : 5 * 1024 * 1024  // 5MB
    }
}) ;

exports.uploadSingleImage = (fielName ) => {
    return upload.single(fielName)
}

// const multerStorage = multer.diskStorage({
//     destination : (req , file , callback) => {
//         const tempPath = path.join(__dirname ,"..","public" ,"tmep") ;
//         callback(null , tempPath) ;
//     },
//     filename : (req , file , callback) => {
//         const uniqueSuffix = Date.now() + "-" +Math.round(Math.random() * 1E9 ) ; 
//         const ext = path.extname(file.originalname) ;
//         callback(null , `image - ${uniqueSuffix} ${ext}`)
//     }
// });

// const multerFilter = (req , file , callback) => {
//     if(file.mimetype.starstWith('image'))  {
//         callback(null , true) ;
//     }
//     else {
//         callback(new Error("not an image ! please upload only image"), false);
//     }

// }

// const upload = multer({
//     storage : multerStorage ,
//     fileFilter : multerFilter ,
//     limits : {
//         fieldSize : 5 * 1024 * 1024 
//     }
// }) ;

// exports.uploadSingleImage = (fielName) => {
//     return upload.single(fielName)
// }