const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tokenSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

});


module.exports = new mongoose.model('Token',tokenSchema,'tokens');