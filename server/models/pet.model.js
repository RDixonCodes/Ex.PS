const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Pet name is required"],
        minlength: [3, "Pet name must be at least 3 characters"]
        },

    type: {
            type: String,
            required: [true, "Pet type is required"],
            minlength: [3, "Pet type must be at least 3 characters"]
        },

    desc: { 
        type: String,
        required: [true, "Pet description is required"],
        minlength: [3, "Pet description must be at least 3 characters"]
    },

    skill1: {
        type:String
    },

    skill2: {
        type:String
    },

    skill3: {
        type:String
    },

    likes: {
        type:Number,
        default: 0,
    } 
    }, { timestamps: true });
module.exports = mongoose.model('Pets', PetSchema);