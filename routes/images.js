const express = require("express");
const router = express.Router();
const auth = require('../controllers/authenticationController');

const imageController = require('../controllers/imageController');

//Insert Image
router.post('/', auth.authenticate, imageController.create);

router.post('/upload', auth.authenticate, imageController.upload);

//Query all Images from DB
router.get('/', auth.authenticate, imageController.readAll);

//Query Image by given id
router.get('/:id', imageController.findById);

//Query Images by given postid
router.get('/post/:postid', imageController.findByPostId);

//Update Image
router.put('/:id', auth.authenticate, imageController.update);

//Delete a Image
router.delete('/:id', auth.authenticate, imageController.delete);

//Delete a Image by Url
router.delete('/url/:url', auth.authenticate, imageController.deleteByUrl);

//delete a Image by given postid
router.delete('/post/:postid', auth.authenticate, imageController.deleteByPostId);

//delete a Image from server
router.delete('/server/:filePath', auth.authenticate, imageController.deleteByFilePath);

module.exports = router;