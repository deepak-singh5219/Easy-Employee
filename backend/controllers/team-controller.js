const teamService = require('../services/team-service');
const ErrorHandler = require('../utils/error-handler');
const TeamDto = require('../dtos/team-dto');
const userService = require('../services/user-service');
const mongoose = require('mongoose');

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

    updateTeam = async (req,res,next) =>
    {
        const {id} = req.params;
        if(!id) return next(ErrorHandler.badRequest('Team Id Is Missing'));
        if(!mongoose.Types.ObjectId.isValid(id)) return next(ErrorHandler.badRequest('Invalid Team Id'));
        const {name,description,status,leader} =req.body;
        const image = req.file && req.file.filename;
        if(leader && !mongoose.Types.ObjectId.isValid(leader)) return next(ErrorHandler.badRequest('Invalid Leader Id'));
        const team = {
            name,
            description,
            status,
            image,
            leader
        }
        const teamResp = await teamService.updateTeam(id,team);
        return (teamResp.modifiedCount!=1) ? next(ErrorHandler.serverError('Failed To Update Team')) : res.json({success:true,message:'Team Has Been Created'})
    }

    getTeams = async (req,res,next) =>
    {
        const teams = await teamService.findTeams({});
        if(!teams) return next(ErrorHandler.notFound('No Team Found'));
        const data = teams.map((o)=> new TeamDto(o));
        res.json({success:true,message:'Team Found',data})
    }

    getTeam = async (req,res,next) =>
    {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return next(ErrorHandler.badRequest('Invalid Team Id'));
        const team = await teamService.findTeam({_id:id});
        if(!team) return next(ErrorHandler.notFound('No Team Found'));
        res.json({success:true,message:'Team Found',data:new TeamDto(team)})
    }

    getCounts = async (req,res,next) =>
    {
        const admin = await userService.findCount({type:'admin'});
        const employee = await userService.findCount({type:'employee'});
        const leader = await userService.findCount({type:'leader'});
        const team = await teamService.findCount({});
        const data = {
            admin,
            employee,
            leader,
            team
        }
        res.json({success:false,message:'Counts Found',data})
    }

}

module.exports = new TeamController();