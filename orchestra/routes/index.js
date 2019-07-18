const express = require('express');
const axios = require('axios');
const redis = require("redis"),
client = redis.createClient();
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// client.set('hacktiv8', 'value!', 'EX', 10);
	client.get("people", async function(err, reply) {
	    // reply is null when the key is missing
	    if(reply){

	    	console.log(reply)
	    	res.status(200).json(JSON.parse(reply))
	    } else {
	    	try {
	    		const { data } = await axios.get('http://localhost:3000/')
	    		client.set(
	    			'people',
	    			JSON.stringify(data),
	    			'EX',
	    			20
	    		)
	    		res.status(200).json(data)

	    	} catch (err) {
	    		res.status(400).json(err.message)
	    	}
	    }
	});
});

module.exports = router;
