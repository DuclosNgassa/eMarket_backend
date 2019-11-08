const express = require("express");
const router = express.Router();

const Categorie = require('../models/Categorie');
const categorie_controller = require('../controllers/categorieController');

//Insert Categorie
router.post('/', categorie_controller.create);

//Query all Categories from DB
router.get('/', categorie_controller.readAll);

//Query Categorie by given id
router.get('/:id', categorie_controller.findById);

//Query Categories by given parentId
router.get('/parent/:parentid', categorie_controller.findByParentId);

//Update Categorie
router.put('/:id', categorie_controller.update);

//Delete a Categorie
router.delete('/:id', categorie_controller.delete);

module.exports = router;