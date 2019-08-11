const express = require("express");
const router = express.Router();

const Image = require('../model/Image')
//Insert
router.post('/', async (req, res, next) => {
    res.send({
        data: "INSERT"
    });
});

module.exports = router;