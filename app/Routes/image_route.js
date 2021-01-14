const imageController = require('../Controllers/image_controller');
const express = require('express');
const router = express.Router();
const checkAuth = require('../Middleware/check-auth');
const multer = require('multer');
const fs = require('fs');



//
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null,  file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(new Error('invalid file type'), false)
    }
     
}
const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//



router.post('/upload', upload.array('images'),checkAuth, imageController.uploadImages);
router.post('/delete', checkAuth, imageController.deleteImages);


module.exports = router;