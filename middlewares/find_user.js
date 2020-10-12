const User = require('../models').User;

module.exports = function(req,res,next){
    
    if(!req.session.userId) return next();
    
    User.findByPk(req.session.userId,{
        include: [
            {
                association: 'tasks' //con esto le agregamos al obj req.user las tareas que estan asociadas a el, mediante association que di=efinimos en el modelo
            }
        ]
    })
    .then(user=>{
        if(user){
            req.user = user;
            next();
        }
    });
}