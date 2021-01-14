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


const deleteImages = ( async (req, res) => {
    const username = req.name;
    let imageId = [];

    if (req.params.id){
        imageId.push(req.params.id);
    }
    else {
        imageId = req.body.Id;
    }
    try{

        let processed = [];

        let multiDelete = async (Id) => await Image.findOneAndDelete({ _id: Id, user: username });
        for (imgId in imageId){
            const Id = imageId[imgId];

            const processing = await multiDelete(Id);
            if (processing){
                processed.push({
                    deleted: true,
                    imgId: Id
                })
            } else {
                processed.push({
                    deleted: false,
                    imgId: Id
                })
            }
        }
        return res.json({
            error: false,
            message: 'image data deleted',
            response: processed
        });
    } catch(err){
        return res.json({
            error: true,
            message: 'an error occured!',
            response: err
        });
    }

});






module.exports = {
    uploadImages,
    deleteImages
}