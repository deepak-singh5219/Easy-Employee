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

}

module.exports = new TeamController();