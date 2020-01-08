const express = require("express");
const router = express.Router();
const auth = require('../controllers/authenticationController');

const userNotificationController = require('../controllers/userNotificationController');

//Insert Favorite
router.post('/', auth.authenticate, userNotificationController.create);

//Query all Favorits from DB
router.get('/', userNotificationController.readAll);

//Query Favorit by given id
router.get('/:id', userNotificationController.findById);

//Query Favorit by given useremail
router.get('/user/:useremail', userNotificationController.findbyUserEmail);

//Update Favorit
router.put('/:id', auth.authenticate, userNotificationController.update);

//Delete a Favorit
router.delete('/:id', auth.authenticate, userNotificationController.delete);

//delete a Favorit by given postid
router.delete('/post/:useremail', auth.authenticate, userNotificationController.deleteByUseremail);

module.exports = router;