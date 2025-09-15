
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

const validateProfileEditData = (req) =>{

    const allowedEditFields = [
        "firstName", 
        "lastName", 
        "emailId", 
        "photoURL",
        "gender", 
        "age", 
        "About",
        "skills",  
    ];

   const isEditAllowed = Object.keys(req.body).every((field )=> 
    allowedEditFields.includes(field)
);

    return isEditAllowed;
}

module.exports = {ValidateSignUpPage, validateProfileEditData};
