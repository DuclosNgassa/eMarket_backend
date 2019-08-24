const express = require("express");
const router = express.Router();

const Image = require('../models/Image');
//const Post = require('../models/Post');

//Insert Image
router.post('/', async (req, res, next) => {
    const {image_url, created_at, postid} = req.body;
    try {
        let newImage = await Image.create({
            image_url,
            created_at,
            postid
        }, {
            fields: ["image_url", "created_at", "postid"]
        });
        if (newImage) {
            res.send({
                result: 'ok',
                data: newImage
            });
        } else {
            res.send({
                result: 'failed',
                data: {},
                message: `Insert a new Image failed`
            });
        }
    } catch (error) {
        res.send({
            result: 'failed',
            data: {},
            message: `Insert a new Image failed. Error: ${error}`
        });
    }
});

//Update Image
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {image_url, created_at, postid} = req.body;
    try {
        let images = await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                id
            }
        });
        if (images.length > 0) {
            images.forEach(
                async (image) => {
                    await image.update({
                        image_url: image_url ? image_url : image.image_url,
                        created_at: created_at ? created_at : image.created_at,
                        postid: postid ? postid : image.postid
                    });
                });
            res.json({
                result: 'ok',
                data: images,
                message: 'Update image successfully'
            });
        } else {
            res.json({
                result: 'failed',
                data: images,
                message: "Cannot find image to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: images,
            message: `Cannot find image to update. Error: ${error}`
        });
    }
});

//Delete a Image
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {

        /*
                await Post.destroy(
                    {
                        where: {
                            imageid: id
                        }
                    });
        */

        let numberOfdeletedRows = await Image.destroy({
            where: {
                id
            }
        });
        res.json({
            result: 'ok',
            message: 'Delete a Image successfully',
            count: numberOfdeletedRows
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Image failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});

//Query all Images from DB
router.get('/', async (req, res, next) => {
    try {
        const images = await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
        });
        res.json({
            result: 'ok',
            data: images,
            length: images.length,
            message: "Query list of Images successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Query list of Images failed. Error ${error}`
        });
    }
});

//Query Image by given id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        let images = await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                id: id
            },
            /*
                        include: [
                            {
                                model: Image,
                                as: 'subcategory',
                                nested:true,
                                required: false
                            }
                        ]
            */
        });
        if (images.length > 0) {
            res.json({
                result: 'ok',
                data: images[0],
                message: "Query Image by id successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Query Image by id failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Image by id failed. Error ${error}`
        });
    }
});

//Query Image by given postid
router.get('/post/:postid', async (req, res, next) => {
    const {postid} = req.params;
    try {
        let images = await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                postid: postid
            },
        });
        if (images.length > 0) {
            res.json({
                result: 'ok',
                data: images,
                message: "Query Categorie by postid successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: [],
                message: "Query Categorie by postid failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Categorie by postid failed. Error ${error}`
        });
    }
});

module.exports = router;