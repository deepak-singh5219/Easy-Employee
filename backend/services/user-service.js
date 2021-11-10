const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class UserService {

    createUser = async user => await UserModel.create(user);

    updateUser = async (_id,user) => await UserModel.updateOne({_id},user);

    findCount = async filter => await UserModel.find(filter).countDocuments();

    findUser = async filter => await UserModel.findOne(filter);

    findUsers = async filter => await UserModel.find(filter).populate('team');

    verifyPassword = async (password,hashPassword) => await bcrypt.compare(password,hashPassword);

    resetPassword = async (_id,password) => await UserModel.updateOne({_id},{password});

    updatePassword = async (_id,password) => await UserModel.updateOne({_id},{password});

    findLeaders = async (req,res,next) =>  await UserModel.aggregate([
    {$match: { "type": 'leader' }},
    {
        $lookup:
        {
            from: "teams",
            localField: "_id",
            foreignField: "leader",
            as: "team"
        }
    }
    ])

    findFreeLeaders = async (req,res,next) =>  await UserModel.aggregate([
    {$match: { "type": 'leader' }},
    {
        $lookup:
        {
            from: "teams",
            localField: "_id",
            foreignField: "leader",
            as: "team"
        }
    },
    {$match: { "team": {$eq:[]} }}
    ])

}


module.exports = new UserService();