const router = require('express').Router();
const userController = require('../controllers/user-controller');
const teamController = require('../controllers/team-controller');
const upload = require('../services/file-upload-service');
const asyncMiddleware = require('../middlewares/async-middleware');

router.post('/user',upload.single('profile'),asyncMiddleware(userController.createUser));
router.patch('/user/:id',upload.single('profile'),asyncMiddleware(userController.updateUser));
router.get('/employees',asyncMiddleware(userController.getUsers));
router.get('/employee/:id',asyncMiddleware(userController.getUser));
router.get('/user/:id',asyncMiddleware(userController.getUserNoFilter));
router.get('/admins',asyncMiddleware(userController.getUsers));
router.get('/admin/:id',asyncMiddleware(userController.getUser));
router.get('/leaders',asyncMiddleware(userController.getUsers));
router.get('/leader/:id',asyncMiddleware(userController.getUser));
router.post('/team',upload.single('image'),asyncMiddleware(teamController.createTeam));
router.patch('/team/:id',upload.single('image'),asyncMiddleware(teamController.updateTeam));
router.get('/teams',asyncMiddleware(teamController.getTeams));
router.get('/team/:id',asyncMiddleware(teamController.getTeam));
router.get('/team/:id/members',asyncMiddleware(teamController.getTeamMembers));
router.patch('/team/member/add',asyncMiddleware(teamController.addMember));
router.delete('/team/member/remove',asyncMiddleware(teamController.removeMember));
router.get('/counts',asyncMiddleware(teamController.getCounts));


module.exports = router;