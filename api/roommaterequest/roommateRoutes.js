var router = require('express').Router();
var controller = require('./roommateController');
router.param('id', controller.params);
router.param('area', controller.area_city);

router.route('/')
 .get(controller.get)
 .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

router.route('/:area/:city')
   .get(controller.get_area_city)

 module.exports=router;