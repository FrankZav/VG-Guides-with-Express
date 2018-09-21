var Genre = require('../models/genre');

// Display list of all Genre.
exports.genre_list = function(req, res, next) {
	Genre.find()
	.sort([['name','ascending']])
	.exec( function (err, list_genres){
		if(err){
			return next(err);
		}
		res.render('genre_list', { title: 'Genre List', list_genres: list_genres});
	});

};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {

    async.parallel({
        genre: function(callback) {

            Genre.findById(req.params.id)
              .exec(callback);
        },

        genre_books: function(callback) {
          Book.find({ 'genre': req.params.id })
          .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
    });

};
