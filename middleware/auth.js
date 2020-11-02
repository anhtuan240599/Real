const User =  require("../model/User");
module.exports.requireAuth = function(req,res,next){
    if(!req.cookies.email ){
        res.redirect('/');
        return;
    }
    User.findOne({ email :req.cookies.email},function(err,data){
        if(!data){
        res.redirect('/');
            return;
        }
        next();
    })
}