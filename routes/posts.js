const express = require("express");
const router = express.Router();

const Post = require('../models/Post');

//Insert Post
router.post('/', async (req, res, next) => {
    const {title, created_at, post_typ, description, fee, fee_typ, city, quartier, status, rating, userid, categorieid} = req.body;
    try {
        let newPost = await Post.create({
            title,
            created_at,
            post_typ,
            description,
            fee,
            fee_typ,
            city,
            quartier,
            status,
            rating,
            userid,
            categorieid
        }, {
            fields: ["title", "created_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "userid", "categorieid"]
        });
        if (newPost) {
            res.send({
                result: 'ok',
                data: newPost
            });
        } else {
            res.send({
                result: 'failed',
                data: {},
                message: `Insert a new Post failed`
            });
        }
    } catch (error) {
        res.send({
            result: 'failed',
            data: {},
            message: `Insert a new Post failed. Error: ${error}`
        });
    }
});

//Update Post
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {title, created_at, post_typ, description, fee, fee_typ, city, quartier, status, rating, userid, categorieid} = req.body;
    try {
        let posts = await Post.findAll({
            attributes: ["id", "title", "created_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "userid", "categorieid"],
            where: {
                id
            }
        });
        if (posts.length > 0) {
            posts.forEach(
                async (post) => {
                    await post.update({
                        title: title ? title : post.title,
                        created_at: created_at ? created_at : post.created_at,
                        post_typ: post_typ ? post_typ : post.post_typ,
                        description: description ? description : post.description,
                        fee: fee ? fee : post.fee,
                        fee_typ: fee_typ ? fee_typ : post.fee_typ,
                        city: city ? city : post.city,
                        quartier: quartier ? quartier : post.quartier,
                        status: status ? status : post.status,
                        rating: rating ? rating : post.rating,
                        userid: userid ? userid : post.userid,
                        categorieid: categorieid ? categorieid : post.categorieid
                    });
                });
            res.json({
                result: 'ok',
                data: posts,
                message: 'Update post successfully'
            });
        } else {
            res.json({
                result: 'failed',
                data: posts,
                message: "Cannot find post to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: posts,
            message: `Cannot find post to update. Error: ${error}`
        });
    }
});

//Delete a Post
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {

        /*
                await Post.destroy(
                    {
                        where: {
                            postid: id
                        }
                    });
        */

        let numberOfdeletedRows = await Post.destroy({
            where: {
                id
            }
        });
        res.json({
            result: 'ok',
            message: 'Delete a Post successfully',
            count: numberOfdeletedRows
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Post failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});

//Query all Posts from DB
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title", "created_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "userid", "categorieid"],
        });
        res.json({
            result: 'ok',
            data: posts,
            length: posts.length,
            message: "Query list of Posts successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Query list of Posts failed. Error ${error}`
        });
    }
});

//Query Post by given id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        let posts = await Post.findAll({
            attributes: ["id", "title", "created_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "userid", "categorieid"],
            where: {
                id: id
            },
            /*
                        include: [
                            {
                                model: Post,
                                as: 'subcategory',
                                nested:true,
                                required: false
                            }
                        ]
            */
        });
        if (posts.length > 0) {
            res.json({
                result: 'ok',
                data: posts[0],
                message: "Query Post by id successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Query Post by id failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Post by id failed. Error ${error}`
        });
    }
});

//Query Posts by given userId
router.get('/user/:userid', async (req, res, next) => {
    const {userid} = req.params;
    try {
        let posts = await Post.findAll({
            attributes: ["id", "title", "created_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "userid", "categorieid"],
            where: {
                userid: userid
            },
        });
        if (posts.length > 0) {
            res.json({
                result: 'ok',
                data: posts,
                message: "Query Post by userid successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: [],
                message: "Query Post by userid failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Post by userid failed. Error ${error}`
        });
    }
});

//Query Posts by given categorieid
router.get('/categorie/:categorieid', async (req, res, next) => {
    const {categorieid} = req.params;
    try {
        let posts = await Post.findAll({
            attributes: ["id", "title", "created_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "userid", "categorieid"],
            where: {
                categorieid: categorieid
            },
        });
        if (posts.length > 0) {
            res.json({
                result: 'ok',
                data: posts,
                message: "Query Categorie by categorieid successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: [],
                message: "Query Categorie by categorieid failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Categorie by categorieid failed. Error ${error}`
        });
    }
});

module.exports = router;