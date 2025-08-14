const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true
    },
    lastName :{
        type : String
    },
    emailId : {
        type : String,
        require : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        require : true
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "other" ].includes(value)){
                throw new error("Gender is not valid");
            }
        }
    },
    PhotoURL : {
        type : String,
        default : "https://images.icon-icons.com/2643/PNG/512/female_woman_user_people_avatar_white_tone_icon_159354.png"
    },
    About : {
        type : String,
        default : "this is default about of the user",
    },
    skills :{
        type : [String]
    }
}, {timestamps : true});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;








