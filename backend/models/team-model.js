const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teamScheam = new Schema({

    name:{
        type:String,
        unique:true,
        require:true,
        minlength:[3,'Team name too short.'],
        maxlength:[20,"Team name too long"],
        trim:true
    },
    description:{
        type:String,
        required:false,
        default:'This team does not have any description'
    },
    image:{
        type:String,
        required:false,
        default:'team.png'
    },
    leader:{
        type:Schema.Types.ObjectId,
        ref:'User',
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

module.exports = new mongoose.model('Team',teamScheam,'teams');