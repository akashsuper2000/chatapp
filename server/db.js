var mongoose = require(''); // add required lib

var Schema = mongoose.Schema;

mongoose.connect(""); // type url to connect

mongoose.connection.on('open', function (ref) {
    // log that connection has been created
});

mongoose.connection.on('error', function (err) {
   // log msg 
    // log the err
});

mongoose.connect('mongodb://localhost/mongodb');

module.exports.user=mongoose.model('User',new Schema({
    name: , // fill in data type
    handle: , // fill in data type
    password: , // fill in data type
    phone:, // fill in data type
    email:, // fill in data type
    friends:[]
},{strict: false}));

module.exports.online=mongoose.model('online',new Schema({
    /*
    create JSON with fields
    handle
    connection_id
    */
}));

module.exports.messages=mongoose.model('message',new Schema({
    /*
    create JSON with fields
    message 
    sender  
    reciever
    date
    */
}));