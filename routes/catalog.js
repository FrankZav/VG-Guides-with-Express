var express = require('express');
var router = express.Router();

// Require controller modules.
var guide_controller = require('../controllers/guideController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
/// guide ROUTES ///

// GET catalog home page.
router.get('/', guide_controller.index);

// GET request for creating a Guide
router.get('/guides/create', guide_controller.guide_create_get);

// POST request for creating Guide
router.post('/guides/create', guide_controller.guide_create_post);

// GET request to update Guide.
router.get('/guides/:id/update', guide_controller.guide_update_get);

// POST request to update Guide.
router.post('/guides/:id/update', guide_controller.guide_update_post);

// GET request for one guide.
router.get('/guides/:id', guide_controller.guide_detail);

// GET request for list of all guide items.
router.get('/guides', guide_controller.guide_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create', author_controller.author_create_post);

// GET request to update Author.
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);


module.exports = router;