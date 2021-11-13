const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async-middleware');
const userController = require('../controllers/user-controller');
const teamController = require('../controllers/team-controller');
const leaderController = require('../controllers/leader-controller');
const upload = require('../services/file-upload-service');

router.patch('/user',upload.single('profile'),asyncMiddleware(userController.updateUser));      // Update Self Profile
router.get('/team',asyncMiddleware(leaderController.getTeam));                                  // Team
router.get('/team/members',asyncMiddleware(leaderController.getTeamMembers));                   // Team Members


module.exports = router;