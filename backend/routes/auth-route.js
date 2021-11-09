const router = require('express').Router();
const authController = require('../controllers/auth-controller');
const {auth} = require('../middlewares/auth-middleware');

router.post('/login',authController.login);                 // Login
router.post('/forgot',authController.forgot);               // Forgot Password
router.patch('/reset',authController.reset);                // Reset Password
router.get('/logout',auth,authController.logout);           // Logout
router.get('/refresh',authController.refresh);              // Refresh Access Token



module.exports = router;