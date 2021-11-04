const mongoose = require('mongosose');
const Schema = mongoose.Schema;


const teamScheam = new Schema({

    name:{
        type:String,
        unique:true,
        require:true,
        trim:true
    },
    image:{
        type:String,
        required:false,
        default:'team.png'
    },
    admin:{
        type:Schema.Types.ObjectId,
        required:false
    },
    status:{
        type:String,
        enum:['active','expired','banned','deleted'],
        default:'active'
    }

},{
    timestamps:true
});

module.exports = new mongoose.module('Team',teamScheam,'teams');