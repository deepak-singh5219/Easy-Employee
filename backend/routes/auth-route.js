const router = require('express').Router();
const authController = require('../controllers/auth-controller');
const {auth} = require('../middlewares/auth-middleware');

router.post('/login',authController.login);
router.post('/forgot',authController.forgot);
router.patch('/reset',authController.reset);
router.get('/logout',auth,authController.logout);
router.get('/refresh',authController.refresh);



module.exports = router;