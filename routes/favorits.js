const express = require("express");
const router = express.Router();
const auth = require('../controllers/authenticationController');

const favoritController = require('../controllers/favoritController');

//Insert Favorite
router.post('/', auth.authenticate, favoritController.create);

//Query all Favorits from DB
router.get('/', favoritController.readAll);

//Query Favorit by given id
router.get('/:id', favoritController.findById);

//Query Favorit by given postid
router.get('/post/:postid', favoritController.findByPostId);

//Query Favorit by given useremail
router.get('/user/:useremail', favoritController.findbyUserEmail);

//Update Favorit
router.put('/:id', auth.authenticate, favoritController.update);

//Delete a Favorit
router.delete('/:id', auth.authenticate, favoritController.delete);

//delete a Favorit by given postid
router.delete('/post/:postid', auth.authenticate, favoritController.deleteByPostId);

module.exports = router;