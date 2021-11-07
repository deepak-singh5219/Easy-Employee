const validator = require('validator');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/error-handler');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const otpService = require('../services/otp-service');
const mailService = require('../services/mail-service');

class AuthController {

    login = async (req,res,next) =>
    {
        const {email,password} = req.body;
        if(!email||!password) return next(ErrorHandler.badRequest());
        let data;
        if(validator.isEmail(email))
            data = {email}
        else
            data = {username:email};
        const user = await userService.findUser(data);
        if(!user) return next(ErrorHandler.badRequest('Invalid Email or Username'));
        const {_id,name,username,email:dbEmail,password:hashPassword,type,status} = user;
        if(status!='active') return next(ErrorHandler.badRequest('There is a problem with your account, Please contact to the admin'));
        const isValid = await userService.verifyPassword(password,hashPassword);
        if(!isValid) return next(ErrorHandler.badRequest('Invalid Password'));
        const payload = {
            _id,
            email:dbEmail,
            username,
            type
        }
        const {accessToken,refreshToken} = tokenService.generateToken(payload);
        await tokenService.storeRefreshToken(_id,refreshToken);
        res.cookie('accessToken',accessToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true
        });
        res.cookie('refreshToken',refreshToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true
        })

        res.json({success:true,message:'Login Successfull',user:new UserDto(user)})
    }

    forgot = async (req,res,next) =>
    {
        const {email:requestEmail} = req.body;
        if(!requestEmail) return next(ErrorHandler.badRequest());
        if(!validator.isEmail(requestEmail)) return next(ErrorHandler.badRequest('Inavlid Email Address'));
        const user = await userService.findUser({email:requestEmail});
        if(!user) return next(ErrorHandler.notFound('Invalid Email Address'));
        const {_id:userId,name,email} = user;
        const otp = otpService.generateOtp();
        const type = process.env.TYPE_FORGOT_PASSWORD || 2;
        await otpService.removeOtp(userId);
        await otpService.storeOtp(userId,otp,type);
        await mailService.sendForgotPasswordMail(name,email,otp);
        res.json({success:true,message:'Email has been sent to your email address'});
    }

    reset = async (req,res,next) =>
    {
        const {email,otp,password} = req.body;
        if(!email || !otp || !password)  return next(ErrorHandler.badRequest());
        const user = await userService.findUser({email});
        if(!user) return next(ErrorHandler.notFound('No Account Found'));
        const {_id:userId} = user;
        const type = process.env.TYPE_FORGOT_PASSWORD || 2;
        const response = await otpService.verifyOtp(userId,otp,type);
        console.log(response);
        if(response==='INVALID') return next(ErrorHandler.badRequest('Invalid OTP'));
        if(response==='EXPIRED') return next(ErrorHandler.badRequest('Otp has been Expired'));
        const {modifiedCount} = await userService.updatePassword(userId,password);
        return modifiedCount===1 ? res.json({success:true,message:'Password has been reset successfully'}) : next(ErrorHandler.serverError('Failed to Reset your password'));
    }

    logout = async (req,res,next) =>
    {
        const {refreshToken} = req.cookies;
        const {_id} = req.user;
        const response = await tokenService.removeRefreshToken(_id,refreshToken);
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return (response.modifiedCount===1) ? res.json({success:true,message:'Logout Successfully'}) : next(ErrorHandler.unAuthorized());
    }

    refresh = async (req,res,next) =>
    {
        const {refreshToken:refreshTokenFromCookie} = req.cookies;
        if(!refreshTokenFromCookie) return next(ErrorHandler.unAuthorized());
        const userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        const {_id,email,username,type} = userData;
        const token = await tokenService.findRefreshToken(_id,refreshTokenFromCookie);
        if(!token)
        {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(401).json({success:false,message:'Unauthorized Access'})
        }
        const user = await userService.findUser({email});
        if(user.status!='active') return next(ErrorHandler.unAuthorized('There is a problem with your account, Please contact to the admin'));
        const payload = {
            _id,
            email,
            username,
            type
        }
        const {accessToken,refreshToken} = tokenService.generateToken(payload);
        await tokenService.updateRefreshToken(_id,refreshTokenFromCookie,refreshToken);
        res.cookie('accessToken',accessToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true
        })
        res.cookie('refreshToken',refreshToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true
        })
        res.json({success:true,message:'Secure access has been granted',user:new UserDto(user)})
    }

}

module.exports = new AuthController();