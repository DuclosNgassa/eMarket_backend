const express = require("express");
const router = express.Router();

const Post = require('../model/Post');
const User = require('../model/User');
const Categorie = require('../model/Categorie');
const Image = require('../model/Image');

//Insert
router.post('/', async (req, res, next) => {
    res.send({
        data: "INSERT"
    });
});

module.exports = router;