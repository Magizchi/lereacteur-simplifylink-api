const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const uid2 = require('uid2');
const app = express();
app.use(cors());
app.use(bodyParser.json());
//import Models
const Link = require('./models/Links');

mongoose.connect(MONGODB_URI || 'mongodb://localhost/ShortLinks-app', { useNewUrlParser: true });

app.post('/', async (req, res) => {
	try {
		const rand = uid2(5);
		const createlien = 'www.TestTechnique.fr/' + rand;
		const newLink = new Link({
			lien: req.body.lien,
			newLien: createlien
		});
		await newLink.save();
		res.json(newLink);
		console.log('3');
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
app.post('/addCounter', async (req, res) => {
	try {
		console.log(req.body.lien);
		const foundLink = await Link.findOne({ lien: req.body.lien });
		if (foundLink) {
			console.log('test ok', foundLink.lien);
			foundLink.counter += 1;
			await foundLink.save();
			res.json(foundLink);
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.get('/', async (req, res) => {
	try {
		const newLink = await Link.find();
		res.json(newLink);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.listen(process.env.PORT || 3700, () => {
	console.log('Server started');
});
