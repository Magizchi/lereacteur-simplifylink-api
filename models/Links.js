const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
	lien: { type: String, default: '' },
	newLien: { type: String, default: '' },
	counter: { type: Number, default: 0 }
});

module.exports = mongoose.model('Link', LinkSchema, 'links');
