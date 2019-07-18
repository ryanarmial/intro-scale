const express = require('express');
const axios = require('axios');
const router = express.Router();
/* GET home page. */
router.get('/', async function(req, res, next) {
	try {
		const { data } = await axios.get('https://swapi.co/api/people')
		res.status(200).json(data.results)

	} catch (err) {
		res.status(400).json(err)
	}
});

module.exports = router;
