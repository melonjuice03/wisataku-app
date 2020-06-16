const db = require("../models");
const Tours = db.tours;
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            status : false,
            message : "Cannot be empty !"
        });
        return;
    }

    const tour = {
        title :  req.body.title,
        description : req.body.description,
        published: req.body.published ? req.body.published : false,
        userId : req.body.userId
    };

    Tours.create(tour)
    .then(
        data => {
            res.send(data);
        })
    .catch(err => {
            res.status(500).send({
                status: false,
                message : err.message || "something error while creating data"
        });
    });
};

exports.findAll = (req, res) => {
    const title =  req.query.title;
    var condition = title ? {title : {[Op.like] : `%${title}%`}} :  null;

    Tours.findAll({where : condition})
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            status : false,
            message : err.message || "something error while retrieving data"
        });
    });
};

exports.findOne =  (req, res) => {
    const id = req.params.id;

    Tours.findByPk(id)
    .then(data => {
        res.send(data);
        })
    .catch(err => {
        res.status(500).send({
            status:false,
            message : err.message || "something error while retrieving data with id = "+id
        });
    });
};

exports.update =  (req, res) => {
    const id = req.params.id;
    Tours.update(req.body,{
        where : {id : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status : true,
                message : "Tours was updated successfully !"
            });
        } else {
            res.send({
                status : false,
                message : `Cannot update Tours with id= ${id}. 
                Maybe tour was not found or request is empty.
                `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status : false,
            message : `Error updating Tours with id = ${id}`
        });
    })
};

// delete single 
exports.delete = (req, res) => {
    const id = req.params.id;
    Tours.destroy({
        where : {id : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status : true,
                message : "Tours was deleted successfully!"
            });
        } else {
            res.send({
                status : false,
                message : `Cannot delete Tours with id= ${id}. 
                Maybe tour was not found or request is empty.
                `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status : false,
            message : `Error deleting Tours with id = ${id}`
        });
    })
};

// delete single 
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    Tours.destroy({
        where : {userId : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status : true,
                message : "Tourss  was deleted successfully !"
            });
        } else {
            res.send({
                status : false,
                message : `Cannot delete Tours with id= ${id}. 
                Maybe tour was not found or request is empty.
                `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status : false,
            message : `Error deleting Tours with id = ${id}`
        });
    })
};

exports.deleteAll =  (req, res) => {
    Tours.destroy({
        where : {},
        truncate : false
    })
    .then(nums => {
        res.send({
            status : true,
            message : `${nums} Tourss were deleted successfully`
        });

    })
    .catch(err => {
        res.status(500).send({
            status :false,
            message : err.message || `Some error occured while removing all tourss`
        });
    });
};

exports.findAllPublished = (req, res) => {
    User.hasMany(Tours, {foreignKey: 'id'})
    Tours.belongsTo(User, {foreignKey: 'userId'})
    Tours.findAll({where : {published :  true}, include: [{ model: User, attributes: ['username'] }]},{raw: true})
    .then( data => {
        const dat = data.map(dt => {
            return Object.assign(
              {},
              {
                id: dt.id,
                title: dt.title,
                description: dt.description,
                username: dt.user.username,
                createdAt: new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: 'numeric', minute: 'numeric', second: 'numeric', 
                    timeZone: 'Asia/Jakarta',
                  }).format(dt.createdAt),
                    updatedAt : new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: 'numeric', minute: 'numeric', second: 'numeric', 
                    timeZone: 'Asia/Jakarta',
                  }).format(dt.updatedAt),
                published : dt.published
              });
            });
        res.send(dat);
    })
    .catch( err => {
        res.status(500).send({
            message :  err.message ||  `Some error occured while removing all tours`
        });
    });
};

exports.findAllUser = (req, res) => {
    const userId = req.params.id;
    Tours.findAll({where : {userId :  userId}})
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message :  err.message ||  `Some error occured while removing all tours`
        });
    });
};