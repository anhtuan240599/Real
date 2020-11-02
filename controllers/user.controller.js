const User = require('../model/User');
const Chat = require('../model/Chat');
var au = require('../middleware/auth')

module.exports.enterRoom = (req,res) => {
    Chat.find(function(err,data){
        if(err){
            res.json({kq:0});
        } else {
            res.render('users/room',{chat:data,email : req.cookies.email})
            
        }
    })
}
module.exports.index = (req,res) => {
    User.find(function(err,data){
        if(err){
            res.json({kq:0});
        } else {
            res.json({user:data})
        }
    })
}

module.exports.chat = (req,res) => {
    Chat.find(function(err,data){
        if(err){
            res.json({kq:0});
        } else {
            res.json({chat:data})
        }
    })
}

module.exports.dangky = (req,res) => {
    res.render('users/register')
}

module.exports.register = (req,res) => {
    const {email,name,password} = req.body;
    const newUser = new User({
        name,
        email,
        password,
    })
    console.log(newUser)
    newUser.save()
    .then(user => {
        res.redirect('/');
    })
    .catch(err => console.log(err));
}

module.exports.dangnhap = (req,res) => {
    res.render('users/login')
}

module.exports.login = (req,res) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({email : email,password:password},function(err,data){
        if(!err) {
            if(!data){
                res.render('login')
            }
            else {
                res.cookie('email',data.email)
                res.redirect('/users/room')
            }
        }
    })
}