const express = require("express");
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');
const Categorie = require('../models/Categorie');
const Image = require('../models/Image');

//Insert
router.post('/', async (req, res, next) => {
    res.send({
        data: "INSERT"
    });
});

module.exports = router;