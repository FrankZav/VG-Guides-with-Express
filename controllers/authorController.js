var Author = require('../models/author');
var async = require('async')
var Guide = require('../models/guide')

// Display list of all Authors.
exports.author_list = function(req, res) {
    Author.find()
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('author_list', { title: 'Author List', author_list: list_authors });
})
};

// Display detail page for a specific Author.
exports.author_detail = function(req, res) {
    
    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        authors_guidess: function (callback) {
            Guide.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_guides: results.authors_guides });
});
};
