const cloudinary = require('cloudinary').v2
const fs = require('fs');


//
const CLOUD_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_SECRET;


//
const blogImageName = new Date().toISOString();

// SEND FILE TO CLOUDINARY
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

function cloudinaryUpload(path){
    console.log(path);
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            {
                public_id: `blog/${blogImageName}`,
                tags: `image-repo`
            },
            (err, image) => {
                if(err) {
                    reject(err);
                }
                if (image) {
                    console.log('File uploaded to cloudinary!');

                    fs.unlinkSync(path);

                    resolve(image);

                }
            }
        )
    });
};


module.exports = cloudinaryUpload;