const TeamModel = require('../models/team-model');

class TeamService{

    createTeam = async team => await TeamModel.create(team);

}

module.exports = new TeamService();