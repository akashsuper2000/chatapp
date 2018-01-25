var mongoose = require('mongoose'); // add required lib

var Schema = mongoose.Schema;

mongoose.connect("mongodb://akashsuper2000:akash2000@ds213338.mlab.com:13338/chat"); // type url to connect

mongoose.connection.on('open', function (ref) {
    console.log("Successfully opened");// log that connection has been created
});

mongoose.connection.on('error', function (err) {
   console.log(err);
   // log msg 
    // log the err
});

mongoose.connect('mongodb://localhost/mongodb');

module.exports.user=mongoose.model('User',new Schema({
    name:String , // fill in data type
    handle:String , // fill in data type
    password:String , // fill in data type
    phone:String, // fill in data type
    email:String, // fill in data type
    friends:[]
},{strict: false}));

module.exports.online=mongoose.model('online',new Schema({
    handle:String,
    connection_id:String
    /*
    create JSON with fields
    handle
    connection_id
    */
}));

module.exports.messages=mongoose.model('message',new Schema({
    message:String, 
    sender:String,  
    reciever:String,
    date:Date
    /*
    create JSON with fields
    message 
    sender  
    reciever
    date
    */
}));