const express = require("express");
const router = express.Router();

const Categorie = require('../models/Categories');

//Insert
router.post('/', async (req, res, next) => {
    let {title, parentid} = req.body;
    try {
        let newCategorie = await Categorie.create({
            title,
            parentid
        }, {
            fields: ["title", "parentid"]
        });
        if (newCategorie) {
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

//Update
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {title, parentid} = req.body;
    try {
        let categories = await Categorie.findAll({
            attributes: ['id', 'title', 'parentid'],
            where: {
                id
            }
        });
        if (categories.length > 0) {
            categories.forEach(
                async (categorie) => {
                    await categorie.update({
                        title: title ? title : categorie.title,
                        parentid: parentid ? parentid : categorie.parentid
                    });
                });
            res.json({
                result: 'ok',
                data: categories,
                message: 'Update categorie successfully'
            });
        } else {
            res.json({
                result: 'failed',
                data: categories,
                message: `Cannot find categorie to update. Error: ${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: categories,
            message: `Cannot find categorie to update. Error: ${error}`
        });
    }
});

//Delete a categorie
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Categorie.destroy(
            {
                where: {
                    parentid: id
                }
            });
        let numberOfdeletedRows = await Categorie.destroy({
            where: {
                id
            }
        });
        res.json({
            result: 'ok',
            message: 'Delete a Categorie successfully',
            count: numberOfdeletedRows
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Categorie failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});
module.exports = router;