const TeamModel = require('../models/team-model');

class TeamService{

    createTeam = async (team) =>
    {
        return await TeamModel.create(team);
    }

}

module.exports = new TeamService();