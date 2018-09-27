//VotingPower.js
var mongoose = require('mongoose');  
var VPSchema = new mongoose.Schema({  
  "voting_power": Number,
  "height": Number,
});
mongoose.model('VotingPower', VPSchema);
module.exports = mongoose.model('VotingPower');
