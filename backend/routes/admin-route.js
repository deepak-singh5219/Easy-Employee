const router = require('express').Router();
const userController = require('../controllers/user-controller');
const teamController = require('../controllers/team-controller');
const upload = require('../services/file-upload-service');
const {auth, authRole} = require('../middlewares/auth-middleware');
const asyncMiddleware = require('../middlewares/async-middleware');

router.post('/user',auth,authRole('admin'),upload.single('profile'),asyncMiddleware(userController.createUser));
router.patch('/user',auth,authRole('admin'),upload.single('profile'),asyncMiddleware(userController.createUser));
router.get('/employees',auth,authRole('admin'),upload.none(),asyncMiddleware(userController.getEmployees));
router.get('/employee/:id',auth,authRole('admin'),upload.none(),asyncMiddleware(userController.getEmployee));
router.post('/team',auth,authRole('admin'),upload.single('image'),asyncMiddleware(teamController.createTeam));
router.patch('/team',auth,authRole('admin'),upload.single('image'),asyncMiddleware(teamController.updateTeam));
router.get('/team/:id',auth,authRole('admin'),asyncMiddleware(teamController.getTeam));
router.get('/teams',auth,authRole('admin'),asyncMiddleware(teamController.getTeams));


module.exports = router;