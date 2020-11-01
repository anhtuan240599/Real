const User = require('../model/User');


module.exports.index = (req,res) => {
    User.find(function(err,data){
        if(err){
            res.json({kq:0});
        } else {
            res.json({user:data})
        }
    })
}