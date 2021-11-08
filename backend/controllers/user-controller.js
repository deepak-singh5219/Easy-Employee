const ErrorHandler = require('../utils/error-handler');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');
const mongoose = require('mongoose');
const crypto = require('crypto');

class UserController {

    createUser = async (req,res,next) =>
    {
        const file = req.file;
        let {name,email,password,type, address, mobile} = req.body;
        const username = 'user'+crypto.randomInt(11111111,999999999);
        console.log(req.file)
        if(!name || !email || !username || !password || !type || !address || !file || !mobile) return next(ErrorHandler.badRequest('All Fields Required'));
        type = type.toLowerCase();
        if(type==='admin')
        {
            const adminPassword = req.body.adminPassword;
            if(!adminPassword)
                return next(ErrorHandler.badRequest(`Please Enter Your Password to Add ${name} as an Admin`));
            const {_id} = req.user;
            const {password:hashPassword} = await userService.findUser({_id});
            const isPasswordValid = await userService.verifyPassword(adminPassword,hashPassword);
            if(!isPasswordValid) return next(ErrorHandler.unAuthorized('You have entered a wrong password'));
        }
        const user = {
            name,email,username,mobile,password,type,address,image:file.filename
        }
        const userResp = await userService.createUser(user);
        if(!userResp) return next(ErrorHandler.serverError('Failed To Create An Account'));
        res.json({success:true,message:'User has been Added',user:new UserDto(user)});
    }

    updateUser = async (req,res,next) =>
    {
        const file = req.file;
        const {id} = req.params;
        const filename = file && file.filename;
        console.log(filename);
        let {name,username,email,password,type,status, address, mobile} = req.body;
        type = type && type.toLowerCase();
        if(!mongoose.Types.ObjectId.isValid(id)) return next(ErrorHandler.badRequest('Invalid User Id'));
        if(type==='admin')
        {
            const adminPassword = req.body.adminPassword;
            if(!adminPassword)
                return next(ErrorHandler.badRequest(`Please Enter Your Password to Add ${name} as an Admin`));
            const {_id} = req.user;
            const {password:hashPassword} = await userService.findUser({_id});
            const isPasswordValid = await userService.verifyPassword(adminPassword,hashPassword);
            if(!isPasswordValid) return next(ErrorHandler.unAuthorized('You have entered a wrong password'));
        }
        const user = {
            name,email,status,username,mobile,password,type,address,image:filename
        }
        const userResp = await userService.updateUser(id,user);
        if(!userResp) return next(ErrorHandler.serverError('Failed To Update Account'));
        res.json({success:true,message:'Account Updated'});
    }

    getUsers = async (req,res,next) =>
    {
        const type = req.path.replace('/','').replace('s','');
        const emps = await userService.findUsers({type});
        if(!emps || emps.length<1) return next(ErrorHandler.notFound(`No ${type.charAt(0).toUpperCase()+type.slice(1).replace(' ','')} Found`));
        const employees = emps.map((o)=> new UserDto(o));
        res.json({success:true,message:'Employee List Found',data:employees})
    }

    getFreeEmployees = async (req,res,next) =>
    {
        const emps = await userService.findUsers({type:'employee',team:null});
        if(!emps || emps.length<1) return next(ErrorHandler.notFound(`No Free Employee Found`));
        const employees = emps.map((o)=> new UserDto(o));
        res.json({success:true,message:'Free Employees List Found',data:employees})
    }


    getUser = async (req,res,next) =>
    {
        const {id} = req.params;
        const type = req.path.replace(id,'').replace('/','').replace('/','');
        if(!mongoose.Types.ObjectId.isValid(id)) return next(ErrorHandler.badRequest(`Invalid ${type.charAt(0).toUpperCase() + type.slice(1).replace(' ','')} Id`));
        const emp = await userService.findUser({_id:id,type});
        if(!emp) return next(ErrorHandler.notFound(`No ${type.charAt(0).toUpperCase() + type.slice(1).replace(' ','')} Found`));
        res.json({success:true,message:'Employee Found',data:new UserDto(emp)})
    }

    getUserNoFilter = async (req,res,next) =>
    {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return next(ErrorHandler.badRequest('Invalid User Id'));
        const emp = await userService.findUser({_id:id});
        if(!emp) return next(ErrorHandler.notFound('No User Found'));
        res.json({success:true,message:'User Found',data:new UserDto(emp)})
    }


}

module.exports = new UserController();