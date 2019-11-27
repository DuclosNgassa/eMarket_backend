const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

//Insert User
router.post('/', userController.create);

//Query all Users from DB
router.get('/', userController.readAll);

//Query all active Users from DB
router.get('/active', userController.readAllActive);

//Query all blocked Users from DB
router.get('/blocked', userController.readAllBlocked);

//Query User by given id
router.get('/:id', userController.findById);

router.get('/email/:email', userController.findbyEmail);

//Update User
router.put('/:id', userController.update);

//Delete a User by id
router.delete('/:id', userController.delete);

//Delete a User by email
router.delete('/email/:email', userController.deleteByEmail);

module.exports = router;