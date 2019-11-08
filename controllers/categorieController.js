const Categorie = require('../models/Categorie');

exports.create = async function(req, res, next) {
    let {title, parentid} = req.body;
    try {
        let newCategorie = await Categorie.create({
            title,
            parentid,
            icon
        }, {
            fields: ["title", "parentid", "icon"]
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
};

exports.readAll = async function (req, res, next) {
    try {
        console.log("Controller");
        await Categorie.findAll({
            attributes: ['id', 'title', 'parentid', 'icon'],
        }).then(categories => {
            res.json({
                result: 'ok',
                data: categories,
                length: categories.length,
                message: "Query list of Categories successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Query list of Categories failed. Error ${error}`
        });
    }
};

exports.findById = async function(req, res, next) {
    const {id} = req.params;
    try {
        await Categorie.findOne({
            attributes: ['id', 'title', 'parentid', 'icon'],
            where: {
                id: id
            },
        }).then(categorie => {
            res.json({
                result: 'ok',
                data: categorie,
                message: "Query Categorie by id successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Query Categorie by id failed. Error ${error}`
        });
    }
};

exports.findByParentId = async function(req, res, next) {
    const {parentid} = req.params;
    try {
        await Categorie.findAll({
            attributes: ['id', 'title', 'parentid', 'icon'],
            where: {
                parentid: parentid
            },
        }).then(categories => {
            res.json({
                result: 'ok',
                data: categories,
                message: "Query Categorie by parentid successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Categorie by parentid failed. Error ${error}`
        });
    }
};

exports.update = async function(req, res, next) {
    const {id} = req.params;
    const {title, parentid} = req.body;
    try {
        let categories = await Categorie.findAll({
            attributes: ['id', 'title', 'parentid', 'icon'],
            where: {
                id
            }
        });
        if (categories.length > 0) {
            await categories.forEach(
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
            message: `Cannot find categorie to update. Error: ${error}`
        });
    }
};

exports.delete = async function(req, res, next) {
    const {id} = req.params;
    try {
        await Categorie.destroy(
            {
                where: {
                    parentid: id
                }
            }).then(() => {
                Categorie.destroy({
                    where: {
                        id
                    }
                }).then(() => {
                    res.json({
                        result: 'ok',
                        message: 'Delete a Categorie successfully',
                    });
                });
            }
        );
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Categorie failed. Error ${error}`,
        });
    }
};