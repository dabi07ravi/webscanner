const mongoose  =  require("mongoose");
const urlProd = process.env.MONGO_URI;
const urlTest = process.env.TEST_URL;

const dbConnection = () => {
    if(process.env.NODE_ENV === "test"){
        mongoose.connect(urlTest);
    }else{
        mongoose.connect(urlProd);
    }
 
    const db = mongoose.connection;
    db.on('connected', function(){
        console.log("db is connected")
    })
    db.on('error', function(){
        console.log("db is not connected")
    })
}


module.exports = dbConnection;