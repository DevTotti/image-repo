const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{
        type: String,
        ref: 'User',
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    visibility:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const ImageModel = mongoose.model('repo', imageSchema);
module.exports = ImageModel;