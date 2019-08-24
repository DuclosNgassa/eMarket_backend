const express = require("express");
const router = express.Router();

const Categorie = require('../models/Categorie');

//Insert Categorie
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
});

//Update Categorie
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
                message: "Cannot find categorie to update."
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

//Delete a Categorie
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

//Query all Categories from DB
router.get('/', async (req, res, next) => {
    try {
        const categories = await Categorie.findAll({
            attributes: ['id', 'title', 'parentid'],
        });
        res.json({
            result: 'ok',
            data: categories,
            length: categories.length,
            message: "Query list of Categories successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Query list of Categories failed. Error ${error}`
        });
    }
});

//Query Categorie by given id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        let categories = await Categorie.findAll({
            attributes: ['id', 'title', 'parentid'],
            where: {
                id: id
            },
/*
            include: [
                {
                    model: Categorie,
                    as: 'subcategory',
                    nested:true,
                    required: false
                }
            ]
*/
        });
        if (categories.length > 0) {
            res.json({
                result: 'ok',
                data: categories[0],
                message: "Query Categorie by id successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Query Categorie by id failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Categorie by id failed. Error ${error}`
        });
    }
});

//Query Categories by given parentId
router.get('/parent/:parentid', async (req, res, next) => {
    const {parentid} = req.params;
    try {
        let categories = await Categorie.findAll({
            attributes: ['id', 'title', 'parentid'],
            where: {
                parentid: parentid
            },
        });
        if (categories.length > 0) {
            res.json({
                result: 'ok',
                data: categories,
                message: "Query Categorie by parentid successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: [],
                message: "Query Categorie by parentid failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Categorie by parentid failed. Error ${error}`
        });
    }
});


module.exports = router;