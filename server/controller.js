var models = require('./db.js');
var path = require('path');
var bodyParser = require(''); // fill in required header



module.exports = function (app,io){
    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({     
        extended: true
    }));
    
    app.get('/',function(req,res){
        // code here --> send response
    });
    
    app.post('/register',function(req,res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
        var user={
            /*
            Fill details in json
            in order - name,handle,password,phone,email
            */
        };
        console.log(user);
        
        models.user.findOne({"handle":req.body.handle},function(err,doc){
            if(err){
                res.json(err); 
            }
            if(doc == null){
                models.user.create(user,function(err,doc){
                    if(err) res.json(err);
                    else{
                        // send sucess page
                    }
                });
            }else{
                // send error page
            }
        })
        
    });
    
    
    var handle=null;
    var private=null;
    var users={};
    var keys={};
    
    app.post('/login',function(req,res){
        console.log(req.body.handle);

        // set respone header

        handle = ; // find handle
        models.user.findOne({"handle":req.body.handle, "password":req.body.password},function(err,doc){
            if(err){
                res.send(err); 
            }
            if(doc==null){
               // send user has not registered
            }
            else{
                console.log("Asas"+__dirname);
               // send sucess
            }
            
    });
    });
    
    io.on('connection',function(socket){
        console.log("Connection :User is connected  "+handle);
        console.log("Connection : " +socket.id);
        
        io.to(socket.id).emit('handle', handle);
        users[handle]=socket.id;
        keys[socket.id]=handle;
        
        console.log("Users list : "+users);
        console.log("keys list : "+keys);
        
        socket.on('group message',function(msg){
            // log the msg
            // emit msg in group
        });
        
        socket.on('private message',function(msg){
            console.log('message  :'+msg.split("#*@")[0]);
            models.messages.create({
                "message":// find message
                "sender" : //find msg
                "reciever": // find msg
                "date" : // get date
            });
            io.to(users[msg.split("#*@")[0]]).emit('private message', msg);
        });
        
        socket.on('disconnect', function(){
            // delete user and keys
            // emit users in users
            console.log(users);
        });
    });
    
    
    
}