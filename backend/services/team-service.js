const TeamModel = require('../models/team-model');

class TeamService{

    createTeam = async team => await TeamModel.create(team);

    findTeams = async filter => await TeamModel.find(filter).populate('leader')

    findTeam = async filter => await TeamModel.findOne(filter).populate('leader');

    findCount = async filter => await TeamModel.find(filter).countDocuments();

    updateTeam = async (_id,data) => await TeamModel.updateOne({_id},data,{ runValidators: true });
    
    

}

module.exports = new TeamService();