const teamService = require('../services/team-service');
const ErrorHandler = require('../utils/error-handler');
const TeamDto = require('../dtos/team-dto');

class TeamController {

    createTeam = async (req,res,next) =>
    {
        const image = req.file && req.file.filename;
        const {name,description} =req.body;
        if(!name) return next(ErrorHandler.badRequest('Required Parameter Teams Name Is Empty'))
        const team = {
            name,
            description,
            image
        }

        const teamResp = await teamService.createTeam(team);
        if(!teamResp) return next(ErrorHandler.serverError('Failed To Create The Team'));
        res.json({success:true,message:'Team Has Been Created',team:new TeamDto(teamResp)});
    }

    getTeams = async (req,res,next) =>
    {
        const teams = await teamService.getTeams({});
        if(!teams) return next(ErrorHandler.notFound('No Team Found'));
        const data = teams.map((o)=> new TeamDto(o));
        res.json({success:true,message:'Team Found',data})
    }

}

module.exports = new TeamController();