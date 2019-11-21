const Favorit = require('../models/Favorit');

exports.create = async function (req, res, next) {
    const {useremail, created_at, postid} = req.body;
    try {
        await Favorit.create({
            useremail,
            created_at,
            postid
        }, {
            fields: ["useremail", "created_at", "postid"]
        }).then(newFavorit => {
            res.send({
                result: 'ok',
                data: newFavorit
            });
        });
    } catch (error) {
        res.send({
            result: 'failed',
            data: {},
            message: `Insert a new Favorit failed. Error: ${error}`
        });
    }
};

exports.readAll = async function (req, res, next) {
    try {
        await Favorit.findAll({
            attributes: ['id', 'useremail', 'created_at', 'postid'],
        }).then(favorits => {
                res.json({
                    result: 'ok',
                    data: favorits,
                    length: favorits.length,
                    message: "Query list of Favorits successfully"
                });
            }
        );
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            length: 0,
            message: `Query list of Favorits failed. Error ${error}`
        });
    }
};

exports.findById = async function (req, res, next) {
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
};

exports.findByPostId = async function (req, res, next) {
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
};

exports.findbyUserEmail = async function (req, res, next) {
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
};

exports.update = async function (req, res, next) {
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
            }).then(favorit => {
                res.json({
                    result: 'ok',
                    data: favorit,
                    message: 'Update Favorit successfully'
                });
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find Favorit to update. Error: ${error}`
        });
    }
};

exports.delete = async function (req, res, next) {
    const {id} = req.params;
    try {
        await Favorit.destroy({
            where: {
                id
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete a Favorit successfully',
                count: numberOfdeletedRows
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Favorit failed. Error ${error}`,
        });
    }
};

exports.deleteByPostId = async function (req, res, next) {
    const {postid} = req.params;
    try {
        await Favorit.destroy({
            where: {
                postid
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete Favorit by Postid successfully',
                count: numberOfdeletedRows
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Favorit  by Postid failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
};
