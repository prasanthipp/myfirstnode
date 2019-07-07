// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;


// var roommateRequestSchema=mongoose.Schema({
//     area:{
//         type:String,
//         required:true
//     },
//     city:{
//         type:String,
//         required:true
//     },
//     gender:{
//         type:String,
//         required:true
//     },
//     rent:{
//         type:Number,
//         required:true
//     },
//     roommates:{
//         type:String,
//         default:1
//     },
//     userId: mongoose.Schema.Types.ObjectId,
//     createdDt:{
//         type:Date,
//         default:Date.now
//     }
// })

// exports.RoommateRequest=mongoose.model('RoommateRequest',roommateRequestSchema,'requests')


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var roommateRequestSchema = new Schema({
 
    area:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    roommates:{
        type:String,
        default:1
    },
    userId: mongoose.Schema.Types.ObjectId,
    createdDt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('RoommateRequest', roommateRequestSchema);