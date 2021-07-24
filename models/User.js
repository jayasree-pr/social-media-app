const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 3,
        max : 20,
        unique : true
    },
    email : {
        type : String,
        required : true,
        min : 3,
        max : 50,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 5,
    },
    profilePicture : {
        type : String,
        default : ""
    },
    coverPicture : {
        type : String,
        default : ""
    },
    followers : {
        type : Array,
        default : []
    },
    followings : {
        type : Array,
        default : []
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    desc : {
        type : String,
        max :50
    },
    city : {
        type : String,
        max : 50
    },
    from : {
        type : String,
        max : 50
    },
    relatonship : {
        type : Number,
        enum : [1,2,3]
    }


},
{timestamps:true}
);

module.exports = mongoose.model("Users",Userschema);