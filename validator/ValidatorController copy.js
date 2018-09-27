// ValidatorController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request-promise');
var jsonQuery = require('json-query');

// import jsonQuery from 'json-query';


router.use(bodyParser.json());

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:address', async (req, res) => {
		
  const current_status = await request('http://104.248.68.225:26657/status');
  const current_height = jsonQuery('result[**][*latest_block_height]', {data: JSON.parse(current_status)}).value;
  // const current_block_time = jsonQuery('result[**][*latest_block_time]', {data: JSON.parse(current_status)}).value;

  var voting_power_history = [];

  for(var i = 0; i < 168; ++i){
    const validators_height = await request(`http://104.248.68.225:26657/validators?height=${Number(current_height) - i*720}`);
    const vp = jsonQuery('result[**][*address=E9955C72E8948800CA82C53463ACF945E70E1CC7].voting_power', {data: JSON.parse(validators_height)}).value;
    voting_power_history.push({value: Number(vp)});
    // console.log(validators_height);
  }

  // const validators = await request('http://104.248.68.225:26657/validators');
  // const q = jsonQuery('result[**][*address=E9955C72E8948800CA82C53463ACF945E70E1CC7].voting_power', {data: JSON.parse(validators)}).value;


  var data = {
    "uptime": 99,
    "voting_power": voting_power_history[0].value,
    // "uptime_history": [],
    "voting_power_history": voting_power_history
  }


  res.status(200).send(data);

  // res.status(200).send(JSON.parse(validators));
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/t/:faraaz', (req, res) => {
	res.status(200).send(`You asked me for ${req.params.faraaz}`);
});

module.exports = router;