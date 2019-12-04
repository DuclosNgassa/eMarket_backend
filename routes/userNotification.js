const express = require("express");
const router = express.Router();

const userNotificationController = require('../controllers/userNotificationController');

//Insert Favorite
router.post('/', userNotificationController.create);

//Query all Favorits from DB
router.get('/', userNotificationController.readAll);

//Query Favorit by given id
router.get('/:id', userNotificationController.findById);

//Query Favorit by given useremail
router.get('/user/:useremail', userNotificationController.findbyUserEmail);

//Update Favorit
router.put('/:id', userNotificationController.update);

//Delete a Favorit
router.delete('/:id', userNotificationController.delete);

//delete a Favorit by given postid
router.delete('/post/:useremail', userNotificationController.deleteByUseremail);

module.exports = router;