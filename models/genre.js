var mongoose = require('mongoose');

var Schema = mongoose.Schema;

GenreSchema = new Schema({
	name: {type: String, required: true, max: 100}
});


GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genreschema/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);