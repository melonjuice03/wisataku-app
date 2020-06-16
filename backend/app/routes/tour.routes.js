module.exports = app => {
    const tour = require("../controllers/tour.controller.js");

    var router =  require("express").Router();

    router.post("/", tour.create);

    router.get("/",tour.findAll);

    router.get("/published", tour.findAllPublished);
    
    router.get("/user/:id", tour.findAllUser);

    router.get("/:id", tour.findOne);

    router.put("/:id", tour.update);

    router.delete("/:id", tour.delete);

    router.delete("/user/:id", tour.deleteUser);

    router.delete("/", tour.deleteAll);

    app.use('/api/tour', router);
};