module.exports = (app) => {
    const Profile = require("../controllers/profile.controller.js");
    var router = require("express").Router();
    router.post("/", Profile.create);
    router.get("/", Profile.getAll);
    router.get("/:id", Profile.getOnly);
    router.get("/status/true", Profile.findAllTrue);
    router.put("/:id", Profile.update);
    router.delete("/:id", Profile.delete);
    router.delete("/delete/all", Profile.deleteAll);
  
    app.use("/api/profile", router);
  };