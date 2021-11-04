const ErrorHandler = require('../utils/error-handler');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');

class UserController {

    createUser = async (req,res,next) =>
    {
        const file = req.file;
        const {name,email,username,password,type, address} = req.body;
        if(!name || !email || !username || !password || !type || !address || !file) return next(ErrorHandler.badRequest());
        if(type==='admin')
        {
            const adminPassword = req.body.adminPassword;
            if(!req.body.adminPassword)
                return next(ErrorHandler.badRequest(`Please Enter Your Password to Add ${name} as an Admin`));
            const {_id} = req.user;
            const {password:hashPassword} = await userService.findUser({_id});
            const isPasswordValid = await userService.verifyPassword(adminPassword,hashPassword);
            if(!isPasswordValid) return next(ErrorHandler.unAuthorized('You have entered a wrong password'));
        }
        const user = {
            name,email,username,password,type,address,image:file.filename
        }
        const userResp = await userService.createUser(user);
        if(!userResp) return next(ErrorHandler.serverError('Failed To Create An Account'));
        res.json({success:true,message:'User has been Added',user:new UserDto(user)});
    }
}

module.exports = new UserController();