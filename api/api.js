var router = require('express').Router();


router.use('/users',require('./user/userRoutes'));

router.use('/roommates',require('./roommaterequest/roommateRoutes'));



module.exports = router;