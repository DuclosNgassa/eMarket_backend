const express = require("express");
const router = express.Router();

const imageController = require('../controllers/imageController');

//Insert Image
router.post('/', imageController.create);

router.post('/upload', imageController.upload);

//Query all Images from DB
router.get('/', imageController.readAll);

//Query Image by given id
router.get('/:id', imageController.findById);

//Query Images by given postid
router.get('/post/:postid', imageController.findByPostId);

//Update Image
router.put('/:id', imageController.update);

//Delete a Image
router.delete('/:id', imageController.delete);

//Delete a Image by Url
router.delete('/url/:url', imageController.deleteByUrl);

//delete a Image by given postid
router.delete('/post/:postid', imageController.deleteByPostId);

//delete a Image from server
router.delete('/server/:filePath', imageController.deleteByFilePath);

module.exports = router;