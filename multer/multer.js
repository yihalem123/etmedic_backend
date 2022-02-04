const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./profilepics')
    },
    filename : function(req,file,cb){
        cb(null, Date.now()+ " - " + file.originalname)
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ||
       file.mimetype === 'image/jpeg'){
        cb(null,true);
    }
    else {
        req.error = "invalid file type";
        cb(null,false)
    }
}

module.exports = multer({
    storage : storage,
    fileFilter : fileFilter
});