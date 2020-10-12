const Task = require('../models').Task;
const User = require('../models').User;
const Category = require('../models').Category;


module.exports = {
    index: function(req,res){
        Task.findAll().then((tasks)=>{
            res.render('tasks/index',{tasks: req.user.tasks});
        })
    },
    show: function(req,res){
        Task.findByPk(req.params.id,{
            include:[
                {
                    model: User,
                    as: 'user'
                },
                'categories'
            ]
        }).then(function(task){
            res.render('tasks/show',{task}) // en JS cuando la variable y la clave rienene el mismo nombre, puedes solo escribir el nombre una vez, no es necesarion poner ej: {task: task}
        })
    },
    edit: async function(req,res,next){
        const categories = await Category.findAll();
        Task.findByPk(req.params.id).then(function(task){
            res.render('tasks/edit',{task, categories})
        });
    },
    create: function(req,res){
        Task.create({
            description: req.body.description,
            userId: req.user.id
        }).then(result=>{
            res.json(result);
        }).catch(err=>{
            console.log(err);
            res.json(err);
        })
    },
    update: function(req,res){
        let task = Task.findByPk(req.params.id)
        .then(task=>{
            task.description = req.body.description;
            task.save().then(()=>{
                let categoriesIds = req.body.checkCate;
                task.addCategories(categoriesIds)
                .then(()=>{
                    res.redirect(`/tasks/${task.id}`);
                })
            })
        })

        /*Task.update({description: req.body.description},{
            where: {
                id: req.params.id
            }
        }).then(function(response){
            res.redirect('/tasks/'+req.params.id)
        })*/
    },
    destroy: function(req,res){
        Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(contElementosEliminados){
            res.redirect('/tasks/')
        })
    },
    new: function(req,res){
        res.render('tasks/new');
    }
};