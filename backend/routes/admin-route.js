const router = require('express').Router();
const userController = require('../controllers/user-controller');
const teamController = require('../controllers/team-controller');
const upload = require('../services/file-upload-service');
const {auth, authRole} = require('../middlewares/auth-middleware');
const asyncMiddleware = require('../middlewares/async-middleware');

router.post('/user',upload.single('profile'),asyncMiddleware(userController.createUser));
router.patch('/user',upload.single('profile'),asyncMiddleware(userController.createUser));
router.get('/employees',asyncMiddleware(userController.getUsers));
router.get('/admins',asyncMiddleware(userController.getUsers));
router.get('/leaders',asyncMiddleware(userController.getUsers));
router.get('/employee/:id',asyncMiddleware(userController.getUser));
router.get('/admin/:id',asyncMiddleware(userController.getUser));
router.get('/leader/:id',asyncMiddleware(userController.getUser));
router.post('/team',upload.single('image'),asyncMiddleware(teamController.createTeam));
router.patch('/team/:id',upload.single('image'),asyncMiddleware(teamController.updateTeam));
router.get('/team/:id',asyncMiddleware(teamController.getTeam));
router.get('/teams',asyncMiddleware(teamController.getTeams));
router.get('/counts',asyncMiddleware(teamController.getCounts));


module.exports = router;