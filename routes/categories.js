const express = require("express");
const router = express.Router();

const Categorie = require('../models/Categories');

//Insert
router.post('/', async (req, res, next) => {
    let {title, parentid} = req.body;
    console.log(req.body.title);

    try {
        let newCategorie = await Categorie.create({
            title,
            parentid
        }, {
            fields:["title","parentid"]
        });
       if(newCategorie){
           res.send({
              result: 'ok',
              data: newCategorie
           });
       } else {
           res.send({
              result: 'failed',
              data: {},
              message: `Insert a new Categorie failed`
           });
       }
    } catch (error) {
        res.send({
            result: 'failed',
            data: {},
            message: `Insert a new Categorie failed. Error: ${error}`
        });
    }
    res.send({
        data: "INSERT"
    });
});

module.exports = router;