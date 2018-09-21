var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    user_name: {type: String, required: true, max: 100},
    date_of_creation: {type: Date},
  }
);

// Virtual for author's userName
AuthorSchema
.virtual('name')
.get(function () {
  return this.user_name;
});


// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);