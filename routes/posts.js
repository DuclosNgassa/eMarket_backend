const express = require("express");
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const Post = require('../models/Post');

//Insert Post
router.post('/', async (req, res, next) => {
    const {title, created_at, updated_at, post_typ, description, fee, fee_typ, city, quartier, status, rating, useremail, categorieid, phone_number} = req.body;
    try {
        let newPost = await Post.create({
            title,
            created_at,
            updated_at,
            post_typ,
            description,
            fee,
            fee_typ,
            city,
            quartier,
            status: "created",
            rating: 5,
            useremail,
            categorieid,
            phone_number
        }, {
            fields: ["title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number"]
        });
        if (newPost) {
            res.send({
                result: 'ok',
                data: newPost
            });
        } else {
            res.send({
                result: 'failed',
                data: null,
                message: `Insert a new Post failed`
            });
        }
    } catch (error) {
        res.send({
            result: 'failed',
            data: null,
            message: `Insert a new Post failed. Error: ${error}`
        });
    }
});

//Query all Posts from DB
router.get('/', async (req, res, next) => {
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number"],
        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                length: posts.length,
                message: "Query list of Posts successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            length: 0,
            message: `Query list of Posts failed. Error ${error}`
        });
    }
});

//Query Post by given id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Post.findOne({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number"],
            where: {
                id: id
            },
        }).then(post => {
            res.json({
                result: 'ok',
                data: post,
                message: "Query Post by id successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Query Post by id failed. Error ${error}`
        });
    }
});

//Query Posts by given useremail
router.get('/user/:useremail', async (req, res, next) => {
    const {useremail} = req.params;
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number"],
            where: {
                useremail: useremail
            },
        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                message: "Query Post by useremail successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Post by useremail failed. Error ${error}`
        });
    }
});

//Query Posts by given categorieid
router.get('/categorie/:categorieid', async (req, res, next) => {
    const {categorieid} = req.params;
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number"],
            where: {
                categorieid: categorieid
            },
        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                message: "Query Categorie by categorieid successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Categorie by categorieid failed. Error ${error}`
        });
    }
});

/*
router.get('/db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/db', results );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});
*/

//Update Post
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {title, created_at, updated_at, post_typ, description, fee, fee_typ, city, quartier, status, rating, useremail, categorieid, phone_number} = req.body;
    try {
        await Post.findOne({
            where: {id: id},
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number"],
        }).then(async post => {
            await post.update({
                title: title ? title : post.title,
                created_at: created_at ? created_at : post.created_at,
                updated_at: updated_at ? updated_at : post.updated_at,
                post_typ: post_typ ? post_typ : post.post_typ,
                description: description ? description : post.description,
                fee: fee ? fee : post.fee,
                fee_typ: fee_typ ? fee_typ : post.fee_typ,
                city: city ? city : post.city,
                quartier: quartier ? quartier : post.quartier,
                status: status ? status : post.status,
                rating: rating ? rating : post.rating,
                useremail: useremail ? useremail : post.useremail,
                categorieid: categorieid ? categorieid : post.categorieid,
                phone_number: phone_number ? phone_number : post.phone_number
            });

            res.json({
                result: 'ok',
                data: post,
                message: 'Update post successfully'
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find post to update. Error: ${error}`
        });
    }
});

//Delete a Post
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Post.destroy({
            where: {
                id
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete a Post successfully',
                count: numberOfdeletedRows
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Post failed. Error ${error}`,
            count: 0
        });
    }
});


module.exports = router;