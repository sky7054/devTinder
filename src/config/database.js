const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect(
        "mongodb+srv://pradamNode:OPAx3Xqh19pF5Hol@pradamnode.tdsmbj5.mongodb.net/devTinder"
    );
};

module.exports = {connectDB}

