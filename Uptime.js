//Uptime.js
var mongoose = require('mongoose');  
var UptimeSchema = new mongoose.Schema({  
  "uptime": Number,
  "samples": Number,
});
mongoose.model('Uptime', UptimeSchema);
module.exports = mongoose.model('Uptime');