const express = require("express");
const router = express.Router();
const auth = require('../controllers/authenticationController');

const userController = require('../controllers/userController');

//Insert User
router.post('/', userController.create);

//Query all Users from DB
router.get('/', auth.authenticate, userController.readAll);

//Query all active Users from DB
router.get('/active', auth.authenticate, userController.readAllActive);

//Query all blocked Users from DB
router.get('/blocked', auth.authenticate, userController.readAllBlocked);

//Query User by given id
router.get('/:id', auth.authenticate, userController.findById);

router.get('/email/:email', userController.findbyEmail);

//Update User
router.put('/:id', auth.authenticate, userController.update);

//Delete a User by id
router.delete('/:id', auth.authenticate, userController.delete);

//Delete a User by email
router.delete('/email/:email', auth.authenticate, userController.deleteByEmail);

module.exports = router;