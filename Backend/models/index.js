const mongoose = require("mongoose");
const uri = "mongodb+srv://usertengi200:7tengi1234@inventclustor.h5ou7em.mongodb.net/test?retryWrites=true&w=majority&appName=inventclustor";


function main() {
    mongoose.connect(uri).then(() => {
        console.log(" DB connected Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };