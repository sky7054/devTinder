const adminAuth = (req, res, next) =>{
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorid = token === "xyzabc";
    if(!isAdminAuthorid){
       res.status(401).send("Unauthorized requst");
    }
    else{
        next();
    }
};

const userAuth = (req, res, next) =>{
    console.log("User auth is getting checked");
    const token = "xyz";
    const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized User");
    }
    else{
        next()
    }
};

module.exports = {adminAuth, userAuth};