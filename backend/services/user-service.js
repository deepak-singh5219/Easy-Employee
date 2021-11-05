const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class UserService {

    createUser = async (user) =>
    {
        return await UserModel.create(user);
    }

    findUser = async (filter) =>
    {
        return await UserModel.findOne(filter);
    }

    findUsers = async (filter) =>
    {
        return await UserModel.find(filter);
    }

    verifyPassword = async (password,hashPassword) =>
    {
        return await bcrypt.compare(password,hashPassword);
    }

    resetPassword = async (_id,password) =>
    {
        return await UserModel.updateOne({_id},{password});
    }

    updatePassword = async (_id,password) =>
    {
        return await UserModel.updateOne({_id},{password});
    }

}


module.exports = new UserService();