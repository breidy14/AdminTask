const express = require('express');
const TasksController = require('../controllers/tasks');

let router = express.Router();

router.route('/tasks').get(TasksController.index).post(TasksController.create);

router.get('/tasks/new', TasksController.new); // esta ruta debe de ir antes de la rutas que utilizan wildcar, 
//ya /new tambien podria ser un wildcar, y entonces nuca se llegaria a la peticion 
//crear nuevo es decir /new

router.get('/tasks/:id/edit', TasksController.edit);

router.route('/tasks/:id')
.get(TasksController.show)
.put(TasksController.update)
.delete(TasksController.destroy);   //wildcard = comodin(/:id)


module.exports = router;
