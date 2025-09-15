const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { default: isURL } = require('validator/lib/isURL');

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
        require : true,
        
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
        lowercase : true,
        validate(value){
            if(!["male", "female", "other" ].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    photoURL : {
        type : String,
        default : "https://images.icon-icons.com/2643/PNG/512/female_woman_user_people_avatar_white_tone_icon_159354.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("Your photoURL is invalid :" + value );
            }
        }
    },
    About : {
        type : String,
        default : "creates a validator that checks if the value length is not less than the given number is default about of the user",
        maxLength : 500 
    },
    skills :{
        type : [String]
    }
}, {timestamps : true});


userSchema.methods.getJWT = async function() {
    const user = this;

    const token  = await jwt.sign(
        { _id : user._id}, 
        "dev@123akas$&",
        { expiresIn: '6d' });
        return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = this.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;








