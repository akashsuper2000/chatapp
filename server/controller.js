var models = require('./db.js');
var path = require('path');
var bodyParser = require('body-parser'); // fill in required header



module.exports = function (app,io){
    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({     
        extended: true
    }));
    
    app.get('/',function(req,res){
        res.sendFile(path.resolve(__dirname + "/../views/index.html"));                    // code here --> send response
    });
    
    app.post('/register',function(req,res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
        var user={
            "name":req.body.name,
            "handle":req.body.handle,
            "password":req.body.password,
            "phone":req.body.phone,
            "email":req.body.email,
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
                        res.sendFile(path.resolve(__dirname+"/../views/test.html"));// send sucess page
                    }
                });
            }else{
                res.send("User Already Exist");// send error page
            }
        })
        
    });
    
    
    var handle=null;
    var private=null;
    var users={};
    var keys={};
    
    app.post('/login',function(req,res){
        console.log(req.body.handle);

        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader("Access-Control-Allow-Method","GET,POST,OPTIONS,PUT,PATCH,DELETE")// set respone header

        handle = req.body.handle ; // find handle
        models.user.findOne({"handle":req.body.handle, "password":req.body.password},function(err,doc){
            if(err){
                res.send(err); 
            }
            if(doc==null){
               res.send("User not registered")// send user has not registered
            }
            else{
                console.log("Asas"+__dirname);
               res.send("User registered")// send sucessres.send("User not registered")
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
            console.log(msg);
            // log the msg
            io.emit(msg);
            // emit msg in group
        });
        
        /*socket.on('private message',function(msg){
            console.log('message  :'+msg.split("#*@")[0]);
            models.messages.create({
                "message":// find message
                "sender" : //find msg
                "reciever": // find msg
                "date" : // get date
            });
            io.to(users[msg.split("#*@")[0]]).emit('private message', msg);
        });*/
        
        socket.on('disconnect', function(){
            delete users[keys[socket.id]];
            // delete user and keys
            io.emit('users',users)
            // emit users in users
            console.log(users);
        });
    });
    
    
    
}