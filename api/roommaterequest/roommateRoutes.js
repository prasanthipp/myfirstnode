var router = require('express').Router();
var controller = require('./roommateController');
// router.param('id', controller.params);

router.route('/')
 .get(controller.get)
 .post(controller.post)

 module.exports=router;
