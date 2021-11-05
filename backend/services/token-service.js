const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY || '9d50ebd75b8eb1b6d754f95695b04aff86562f9a2dc9992ef574d82eceae20207a94a878c32563c602837c72ba9475867744c524b2cc90f2d2311bda0188cad7'
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY || '16ed5545a82006b2ce13b8c5a7f899d9c2eb72ef45872ce356039d9da53ef4988a9a77aaae9729d3094588aa41ab0ab9b34115eaa9531d775b4019fb2005385d'
class TokenService {

    generateToken = (payload) =>
    {
        const accessToken = jwt.sign(payload,accessTokenSecretKey,{
            expiresIn:'1h'
        });
        const refreshToken = jwt.sign(payload,refreshTokenSecretKey,{
            expiresIn:'1y'
        });
        return {accessToken,refreshToken};
    }

    storeRefreshToken = async (userId,token) =>
    {
        const tokens = {token}
        const isExist = await TokenModel.exists({userId})
        if(!isExist)
            return await TokenModel.create({userId,tokens})
        else
            return await TokenModel.findOneAndUpdate({userId},{$push:{tokens}});
    }

    removeRefreshToken = async (userId,token) =>
    {
        const tokens = {token}
        return await TokenModel.updateOne({userId,'tokens.token':token},{$pull:{tokens}});
    }

    verifyRefreshToken =  refreshToken => jwt.verify(refreshToken,refreshTokenSecretKey);

    verifyAccessToken = accessToken => jwt.verify(accessToken,accessTokenSecretKey);

    findRefreshToken = async (userId,token) => await TokenModel.findOne({userId,'tokens.token':token}).select({tokens:{$elemMatch:{token}}});

    updateRefreshToken = async (userId,oldToken,token) => await TokenModel.findOneAndUpdate({userId,'tokens.token':oldToken},{$set:{'tokens.$.token':token}});

}

module.exports = new TokenService();