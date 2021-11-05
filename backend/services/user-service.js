const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class UserService {

    createUser = async (user) => await UserModel.create(user);

    findUser = async filter => await UserModel.findOne(filter);

    findUsers = async filter => await UserModel.find(filter);

    verifyPassword = async (password,hashPassword) => await bcrypt.compare(password,hashPassword);

    resetPassword = async (_id,password) => await UserModel.updateOne({_id},{password});

    updatePassword = async (_id,password) => await UserModel.updateOne({_id},{password});

}


module.exports = new UserService();