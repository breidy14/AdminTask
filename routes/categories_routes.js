const express = require('express');
const CategoryControllers = require('../controllers/categories');

let router = express.Router();

router.route('/categories').get(CategoryControllers.index).post(CategoryControllers.create);

router.get('/categories/new', CategoryControllers.new);

router.get('/categories/:id/edit', CategoryControllers.edit);

router.route('/categories/:id')
.get(CategoryControllers.show)
.put(CategoryControllers.update)
.delete(CategoryControllers.destroy);

module.exports = router;