const express = require("express");
const router = express.Router();
const auth = require('../controllers/authenticationController');

const messageController = require('../controllers/messageController');

//Insert Message
router.post('/', auth.authenticate, messageController.create);

//Query all Messages from DB
router.get('/', auth.authenticate, messageController.readAll);

//Query Message by given id
router.get('/:id', auth.authenticate, messageController.findById);

//Query Message by given postid
router.get('/post/:postid', auth.authenticate, messageController.findByPostId);

//Query Message by email
router.get('/email', auth.authenticate, messageController.findByEmail);

//Query Message by given sender
router.get('/sender', auth.authenticate, messageController.findBySenderEmail);

//Query Message by given receiver
router.get('/receiver', auth.authenticate, messageController.findByReceiverEmail);

//Update Message
router.put('/:id', auth.authenticate, messageController.update);

//Delete a Message
router.delete('/:id', auth.authenticate, messageController.delete);

//delete a Message by given postid
router.delete('/post/:postid', auth.authenticate, messageController.deleteByPostId);

module.exports = router;