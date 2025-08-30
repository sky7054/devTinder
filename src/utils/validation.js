
const validator = require('validator');

const ValidateSignUpPage = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName && !lastName){
        throw new Error ("Name is not valid!");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please Enter Correct Email address");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter Strong Password!");
    }
};
module.exports = {ValidateSignUpPage};
