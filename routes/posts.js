const express = require("express");
const router = express.Router();

const postController = require('../controllers/postController');

//Insert Post
router.post('/', postController.create);

//Query all Posts from DB
router.get('/', postController.readAll);

//Query Post by given id
router.get('/:id', postController.findById);

//Query Posts by given useremail
router.get('/user/:useremail',postController.findByUsermail);

//Query Posts by given categorieid
router.get('/categorie/:categorieid', postController.findByCategorieId);

//Update Post
router.put('/:id', postController.update);

//Delete a Post
router.delete('/:id', postController.delete);


module.exports = router;