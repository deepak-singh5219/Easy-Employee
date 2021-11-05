const TeamModel = require('../models/team-model');

class TeamService{

    createTeam = async team => await TeamModel.create(team);

    findTeams = async filter => await TeamModel.find(filter).populate('leader')

    findTeam = async filter => await TeamModel.findOne(filter).populate('leader');

}

module.exports = new TeamService();