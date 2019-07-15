var router = require('express').Router();
// var logger = require('../../util/logger');
var controller = require('./userController');
router.param('id', controller.params);

router.route('/')
 .get(controller.get)
  .post(controller.post)
 
router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

router.route('/:id/logout')
  .get(controller.logout)

router.route('/:id/me')
  .get(controller.me)

router.route('/login')
  .post(controller.login)

router.route('/register')
  .post(controller.register)

module.exports=router;


