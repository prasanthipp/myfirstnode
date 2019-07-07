var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
 
  name:{
    type: String,
    required: true
    
  },
 
  phone:Number,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfRegistration:{
    type:Date,
    default:Date.now
},
});


module.exports = mongoose.model('user', UserSchema);