const Image = require('../Models/images_model');
const mongoose = require('mongoose');
const cloudinary = require('../Clouds/cloudinary_service');
const fs = require('fs');




const uploadImages = (async (req, res) => {
    const files =  req.files;
    const username = req.name;
    if (!files) {
        return res.json({
            error: true,
            message: "no file uploaded!"
        });
    }
    if (!username) {
        for (index in files) {
            let file = files[index].path;
            fs.unlinkSync(file);
        }
        return res.json({
            error: true,
            message: 'Authentication has failed!'
        });
    }

    try {
        let imageUrls = [];
        
        let multiple = async (path) => await cloudinary(path);
        for (index in files){
            let file = files[index];
            let path = file.path;

            const filePath = await multiple(path);
            imageUrls.push(filePath);
        }

        if (imageUrls) {
            console.log(imageUrls);

            
            let count = [];

            let multidata = async (imageCloud) => await imageCloud.save();

            for (imageUrl in imageUrls) {
                
                let url = imageUrls[imageUrl].url;

                const imageCloud = new Image({
                    _id: new mongoose.Types.ObjectId,
                    user: username,
                    imageUrl: url,
                    visibility: req.body.visibility
                });
                const processed = await multidata(imageCloud);
                if (processed){
                    count.push(processed);
                }
            }
            return res.json({
                error: false,
                message: `Total processed image data: ${count.length}`,
                response: count
            });
        }
    }
    catch(err) {
        return res.json({
            error: true,
            message: 'an error occured!',
            response: err
        });
    }
});


const deleteImages = ((req, res) => {

});






module.exports = {
    uploadImages,
    deleteImages
}