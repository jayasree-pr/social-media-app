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
    followins : {
        type : Array,
        default : []
    },
    isAdmin : {
        type : Boolean,
        default : false
    }

},
{timestamps:true}
);

module.exports = mongoose.model("Users",Userschema);