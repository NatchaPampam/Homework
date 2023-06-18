module.exports = (app) => {
    const Users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    router.post("/", Users.create);
    router.get("/", Users.getAll);
    router.get("/:id", Users.getOnly);
    router.get("/status/true", Users.findAllTrue);
    router.put("/:id", Users.update);
    router.delete("/:id", Users.delete);
    router.delete("/delete/all", Users.deleteAll);
  
    app.use("/api/users", router);
  };