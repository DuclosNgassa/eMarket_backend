const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Image = require('../models/Image');

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

//Set storage engine
const Storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        const fileName = file.originalname.split('.')[0] +
            '-' +
            Date.now() +
            path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({
    limit: 10 * 1024 * 1024,
    storage: Storage
}).single('image');

router.post('/upload', (req, res, next) => {
    upload(req, res, err => {
        if (err) {
            return res.status(500).json({message: err.message});
        }

        const p = req.file.path
            .split(path.sep)
            .slice(1)
            .join('/');
        res.status(200).json({path: p});
    });
});

//Query all Images from DB
router.get('/', async (req, res, next) => {
    try {
        await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
        }).then(images => {
            res.json({
                result: 'ok',
                data: images,
                length: images.length,
                message: "Query list of Images successfully"
            });
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
        await Image.findOne({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                id: id
            },
        }).then(image => {
            res.json({
                result: 'ok',
                data: image,
                message: "Query Image by id successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Query Image by id failed. Error ${error}`
        });
    }
});

//Query Images by given postid
router.get('/post/:postid', async (req, res, next) => {
    const {postid} = req.params;
    try {
        await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                postid: postid
            },
        }).then(images => {
            res.json({
                result: 'ok',
                data: images,
                message: "Query Images by postid successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Images by postid failed. Error ${error}`
        });
    }
});

//Update Image
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {image_url, created_at, postid} = req.body;
    try {
        await Image.findOne({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                id
            }
        }).then(async image => {
            await image.update({
                image_url: image_url ? image_url : image.image_url,
                created_at: created_at ? created_at : image.created_at,
                postid: postid ? postid : image.postid
            });
            res.json({
                result: 'ok',
                data: image,
                message: 'Update image successfully'
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find image to update. Error: ${error}`
        });
    }
});

//Delete a Image
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                id: id
            },
        }).then(images => {
            images.forEach(image => {
                let filePath = image.image_url.split('/images')[1];
                filePath = './public/images' + filePath;
                console.log('Imagepath to delete: ' + filePath);
                fs.unlinkSync(filePath);
            });
        }).then(() => {
            Image.destroy({
                where: {
                    id
                }
            }).then(numberOfdeletedRows => {
                res.json({
                    result: 'ok',
                    message: 'Delete a Image successfully',
                    count: numberOfdeletedRows
                });
            })
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Image failed. Error ${error}`,
            count: 0
        });
    }
});

//Delete a Image by Url
router.delete('/url/:url', async (req, res, next) => {
    const {url} = req.params;
    const urlToRemove = "http://192.168.2.120:3000/images/" + url;
    console.log('Url to delete: ');
    try {
        await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                image_url: urlToRemove
            },
        }).then(images => {
            images.forEach(image => {
                let filePath = image.image_url.split('/images')[1];
                filePath = './public/images' + filePath;
                console.log('Imagepath to delete: ' + filePath);
                fs.unlinkSync(filePath);
            });
        }).then(() => {
            Image.destroy({
                where: {
                    image_url: urlToRemove
                }
            }).then(numberOfdeletedRows => {
                res.json({
                    result: 'ok',
                    message: 'Delete a Image successfully',
                    count: numberOfdeletedRows
                });
            })
        });
    } catch (error) {
        console.log("Errooooooor");
        res.json({
            result: 'failed',
            message: `Delete a Image failed. Error ${error}`,
            count: 0
        });
    }
});

//delete a Image by given postid
router.delete('/post/:postid', async (req, res, next) => {
    const {postid} = req.params;
    try {
        let images = await Image.findAll({
            attributes: ['id', 'image_url', 'created_at', 'postid'],
            where: {
                postid: postid
            },
        });

        images.forEach(image => {
            let filePath = image.image_url.split('/images')[1];
            filePath = './public/images/' + filePath;
            console.log('Imagepath: ' + filePath);
            fs.unlinkSync(filePath);
        });

        let numberOfdeletedRows = await Image.destroy({
            where: {
                postid
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete a Image successfully',
                count: numberOfdeletedRows
            });
        });

    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Image failed. Error ${error}`,
            count: 0
        });
    }
});

//delete a Image from server
router.delete('/server/:filePath', async (req, res, next) => {
    const {filePath} = req.params;
    try {
        await fs.unlinkSync(filePath);
        res.json({
            result: 'ok',
            message: 'Delete image on server successfully',
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete image on server failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});

module.exports = router;