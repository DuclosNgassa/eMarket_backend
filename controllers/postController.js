const Post = require('../models/Post');

//Insert Post
exports.create = async function (req, res, next) {
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
            phone_number,
            count_view: 0
        }, {
            fields: ["title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"]
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
};

//Query all Posts from DB
exports.readAll = async function (req, res, next) {
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
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
};

//Query Post by given id
exports.findById = async function (req, res, next) {
    const {id} = req.params;
    try {
        await Post.findOne({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
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
};

//Query Posts by given useremail
exports.findByUsermail = async function (req, res, next) {
    const {useremail} = req.params;
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
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
};

//Query Posts by given categorieid
exports.findByCategorieId = async function (req, res, next) {
    const {categorieid} = req.params;
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
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
};

//Update Post
exports.update = async function (req, res, next) {
    const {id} = req.params;
    const {title, created_at, updated_at, post_typ, description, fee, fee_typ, city, quartier, status, rating, useremail, categorieid, phone_number, count_view} = req.body;
    try {
        await Post.findOne({
            where: {id: id},
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quartier", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
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
                phone_number: phone_number ? phone_number : post.phone_number,
                count_view: count_view ? count_view : post.count_view
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
};

//Delete a Post
exports.delete = async function (req, res, next) {
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
};