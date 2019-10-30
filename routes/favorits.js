const express = require("express");
const router = express.Router();

const Favorit = require('../models/Favorit');

//Insert Favorite
router.post('/', async (req, res, next) => {
    const {useremail, created_at, postid} = req.body;
    try {
        let newFavorit = await Favorit.create({
            useremail,
            created_at,
            postid
        }, {
            fields: ["useremail", "created_at", "postid"]
        });
        if (newFavorit) {
            res.send({
                result: 'ok',
                data: newFavorit
            });
        } else {
            res.send({
                result: 'failed',
                data: {},
                message: `Insert a new Favorit failed`
            });
        }
    } catch (error) {
        res.send({
            result: 'failed',
            data: {},
            message: `Insert a new Favorit failed. Error: ${error}`
        });
    }
});

//Query all Favorits from DB
router.get('/', async (req, res, next) => {
    try {
        const favorits = await Favorit.findAll({
            attributes: ['id', 'useremail', 'created_at', 'postid'],
        });
        res.json({
            result: 'ok',
            data: favorits,
            length: favorits.length,
            message: "Query list of Favorits successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Query list of Favorits failed. Error ${error}`
        });
    }
});

//Query Favorit by given id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Favorit.findOne({
            attributes: ['id', 'useremail', 'created_at', 'postid'],
            where: {
                id: id
            },
        }).then(favorit => {
            res.json({
                result: 'ok',
                data: favorit,
                message: "Query Favorit by id successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Favorit by id failed. Error ${error}`
        });
    }
});

//Query Favorit by given postid
router.get('/post/:postid', async (req, res, next) => {
    const {postid} = req.params;
    try {
        await Favorit.findAll({
            attributes: ['id', 'useremail', 'created_at', 'postid'],
            where: {
                postid: postid
            },
        }).then(favorits => {
            res.json({
                result: 'ok',
                data: favorits,
                message: "Query Favorit by postid successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Favorit by postid failed. Error ${error}`
        });
    }
});

//Query Favorit by given useremail
router.get('/user/:useremail', async (req, res, next) => {
    const {useremail} = req.params;
    try {
        await Favorit.findAll({
            attributes: ['id', 'useremail', 'created_at', 'postid'],
            where: {
                useremail: useremail
            },
        }).then(favorits => {
            res.json({
                result: 'ok',
                data: favorits,
                message: "Query Favorit by useremail successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Favorit by useremail failed. Error ${error}`
        });
    }
});

//Update Favorit
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {useremail, created_at, postid} = req.body;
    try {
        await Favorit.findOne({
            attributes: ['id', 'useremail', 'created_at', 'postid'],
            where: {
                id
            }
        }).then(async favorit => {
            await favorit.update({
                useremail: useremail ? useremail : favorit.useremail,
                created_at: created_at ? created_at : favorit.created_at,
                postid: postid ? postid : favorit.postid
            });

            res.json({
                result: 'ok',
                data: favorit,
                message: 'Update Favorit successfully'
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find Favorit to update. Error: ${error}`
        });
    }
});

//Delete a Favorit
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        let numberOfdeletedRows = await Favorit.destroy({
            where: {
                id
            }
        });
        res.json({
            result: 'ok',
            message: 'Delete a Favorit successfully',
            count: numberOfdeletedRows
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Favorit failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});

//delete a Favorit by given postid
router.delete('/post/:postid', async (req, res, next) => {
    const {postid} = req.params;
    try {
        let numberOfdeletedRows = await Favorit.destroy({
            where: {
                postid
            }
        });
        res.json({
            result: 'ok',
            message: 'Delete Favorit by Postid successfully',
            count: numberOfdeletedRows
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Favorit  by Postid failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});

module.exports = router;