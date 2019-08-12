const express = require("express");
const router = express.Router();

const Image = require('../models/Image');
const Post = require('../models/Post');

//Insert
router.post('/', async (req, res, next) => {
    res.send({
        data: "INSERT"
    });
});

module.exports = router;