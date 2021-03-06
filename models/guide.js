var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuideSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
  }
);

// Virtual for book's URL
GuideSchema
.virtual('url')
.get(function () {
  return '/catalog/guide/' + this._id;
});

//Export model
module.exports = mongoose.model('Guide', GuideSchema);