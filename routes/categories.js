const express = require("express");
const router = express.Router();

const categorieController = require('../controllers/categorieController');

//Insert Categorie
router.post('/', categorieController.create);

//Query all Categories from DB
router.get('/', categorieController.readAll);

//Query Categorie by given id
router.get('/:id', categorieController.findById);

//Query Categories by given parentId
router.get('/parent/:parentid', categorieController.findByParentId);

//Update Categorie
router.put('/:id', categorieController.update);

//Delete a Categorie
router.delete('/:id', categorieController.delete);

module.exports = router;