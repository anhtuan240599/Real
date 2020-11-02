var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var cookieParser = require('cookie-parser')
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var mangUser=[];
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(4000);
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

app.use(cookieParser('asdsadd'))

const Chat = require('./model/Chat');
const User = require('./model/User');

var userRoute = require('./routes/user.route');
const { connect } = require('http2');
app.use ('/users',userRoute); 
//DB config 
const db = require('./config/key').MongoURI;
//connect to Mongo
mongoose.connect(db,{useNewUrlParser: true})
    .then(() => console.log("Mongo Connected"))
    .catch(err => console.log(err));

io.on("connection",function(socket){
    console.log("Co nguoi ket noi : "+ socket.id);

    socket.on("disconnect",function(){
        console.log(socket.id + " ngat ket noi ")
    });

    socket.on("tao-room",function(data){
        socket.join(data);
        socket.Phong=data;
        var mang=[];
        for( r in socket.adapter.rooms){
            mang.push(r);
        }
        io.sockets.emit("server-send-room",mang);
        socket.emit("server-send-room-socket",data)
        
    })
    socket.on("user-chat",function(data){
        const newChat = new Chat({
            text : data,
            
            room : socket.Phong
        })
        newChat.save()
        
        io.sockets.in(socket.Phong).emit("server-chat",{un : socket.id , nd : data })
    })

    socket.on("user-send-message",function(data){
            
        io.sockets.emit("server-send-message",{un : socket.Username, nd:data})
        
    })


    socket.on("client-send-Username",function(data){
        if(mangUser.indexOf(data) >= 0){
            socket.emit("server-send-dki-thatbai");
        } else {
            mangUser.push(data);
            socket.Username = data;
            socket.emit("server-send-dki-thanhcong",data)
            io.sockets.emit("server-send-danhsach-User",mangUser);
        }
    })
        socket.on("logout",function(){
            mangUser.splice(
                mangUser.indexOf(socket.Username),1
            );
            socket.broadcast.emit("server-send-danhsach-User",mangUser);
        });

        socket.on("typing",function(){
            var s= socket.Username + " typing....";
            io.sockets.emit("someone-typing",s);

        })

        socket.on("stop-typing",function(){
            io.sockets.emit("someone-stop");
        })


        socket.on("user-send-message",function(data){
            io.sockets.emit("server-send-message",{un : socket.Username, nd:data})
            
        })

        

    

        //phat tinh hieu toan server
        // io.sockets.emit("Server-send-data", data+"888")

        //chi phat tinh hieu cho nguoi phat 
        // socket.emit("Server-send-data", data+"888")

        //phat nhung nguoi con lai tru nguoi phat
        // socket.broadcast.emit("Server-send-data",data+"888")
    
    
});


app.get("/",function(req,res){
    Chat.find(function(err,data){
        if(err){
            res.json({kq:0});
        } else {
            res.render('index',{chat:data,email : req.cookies.email})
            
        }
    })
})


app.get("/main",function(req,res){
    res.render("main")
})

module.exports = connect;