var Guide = require('../models/guide');
var Author = require('../models/author');
var Genre = require('../models/genre');


var async = require('async');

exports.index = function(req, res) {
    
    async.parallel({
        guide_count: function(callback) {
            Guide.count(callback);
        },
        author_count: function(callback) {
            Author.count(callback);
        },
        genre_count: function(callback) {
            Genre.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Video Game Guides', error: err, data: results });
    });
};

// Display list of all guides.
exports.guide_list = function(req, res) {
    Guide.find({}, 'title author ')
    .populate('author')
    .exec(function (err, list_guides) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('guide_list', { title: 'Guide List', guide_list:  list_guides});
});
};

// Display detail page for a specific guide.
exports.guide_detail = function(req, res) {
    async.parallel({
        guide: function(callback) {

            Guide.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.guide==null) { // No results.
            var err = new Error('guide not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('guide_detail', { title: 'Guide On', guide:  results.guide} );
    });
};
