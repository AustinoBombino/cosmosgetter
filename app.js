// app.js
var express = require('express');
var app = express();
var request = require('request');
var db = require('./db');
var request = require('request-promise');
var jsonQuery = require('json-query');
var VotingPower = require('./VotingPower');
// var Uptime = require('./Uptime');

// var ValidatorController = require('./validator/ValidatorController');
// app.use('/validator', ValidatorController);
// async function createuptime(){
// 	const current_status = await request('http://104.248.68.225:26657/status');
// 	const current_height = jsonQuery('result[**][*latest_block_height]', {data: JSON.parse(current_status)}).value;
// 	Uptime.create({
// 	    	"uptime" : Number(vp),
// 	 	   	"samples" : Number(current_height),
// 	    }, function (err, user) {
// 	        if (err) console.log("There was a problem adding the information to the database.");
// 	});
// }
async function pullandstore(){
// setInterval(async () => {

  const current_status = await request('http://104.248.68.225:26657/status');
  const current_height = jsonQuery('result[**][*latest_block_height]', {data: JSON.parse(current_status)}).value;
  // const current_block_time = jsonQuery('result[**][*latest_block_time]', {data: JSON.parse(current_status)}).value;

  // var voting_power_history = [];

    const validators_height = await request(`http://104.248.68.225:26657/validators?height=${Number(current_height)}`);
    const vp = jsonQuery('result[**][*address=E9955C72E8948800CA82C53463ACF945E70E1CC7].voting_power', {data: JSON.parse(validators_height)}).value;
    // console.log(validators_height);

  // const validators = await request('http://104.248.68.225:26657/validators');
  // const q = jsonQuery('result[**][*address=E9955C72E8948800CA82C53463ACF945E70E1CC7].voting_power', {data: JSON.parse(validators)}).value;


    VotingPower.create({
            "voting_power" : Number(vp),
            "height" : Number(current_height),
        }, 
        function (err, user) {
            if (err) console.log("There was a problem adding the information to the database.");
        });
console.log(`added vp: ${Number(vp)} height: ${Number(current_height)}`);
}

// createuptime();
setInterval(pullandstore, 60 * 1000);

// console.log('hello');

module.exports = app;