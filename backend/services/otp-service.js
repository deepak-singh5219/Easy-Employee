const crypto = require('crypto');
const OtpModel = require('../models/otp-model');

class OtpService {

    generateOtp = () =>
    {
        return crypto.randomInt(100000,999999);
    }

    storeOtp = async (userId,otp,type) =>
    {
        return await OtpModel.create({userId,otp,type});
    }

    removeOtp = async (userId) =>
    {
        return await OtpModel.deleteOne({userId});
    }

    verifyOtp = async (userId,otp,type) =>
    {
        const otpData = await OtpModel.findOne({userId,otp,type});
        if(otpData)
        {
            const now = new Date(1635966633159);
            await this.removeOtp(userId);
            if(now<otpData.expire)
            {
                return 'VALID';
            }
            else
                return 'EXPIRED'
        }
        else
            return 'INVALID'
    }   

}

module.exports = new OtpService();