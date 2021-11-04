const router = require('express').Router();
const userController = require('../controllers/user-controller');
const upload = require('../services/file-upload-service');
const auth = require('../middlewares/auth-middleware');
const asyncMiddleware = require('../middlewares/async-middleware');

router.post('/user',auth,upload.single('image'),asyncMiddleware(userController.createUser));
// router.post('/user',auth,upload.single('image'),userController.createUser);


module.exports = router;