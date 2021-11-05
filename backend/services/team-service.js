const TeamModel = require('../models/team-model');

class TeamService{

    createTeam = async team => await TeamModel.create(team);

    getTeams = async filter => await TeamModel.find(filter).populate('leader')

}

module.exports = new TeamService();