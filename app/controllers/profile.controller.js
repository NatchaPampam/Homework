const db = require("../models");
const Profile = db.Profile;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  };
  const data = {
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname,
    email: req.body.email,
    status: req.body.status ? req.body.status : false,
  };
  Profile.create(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Create User.",
      });
    });
};

exports.getAll = (req, res) => {
    nickname: req.body.nickname,
    Profile.findAll({ attributes: ["name", "surname", "nickname", "email", "status"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while Retrieve Profile Data.",
      });
    });
};

exports.getOnly = (req, res) => {
  const id = req.params.id;

  Profile.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Profile with id=" + id,
      });
    });
};

exports.findAllTrue = (req, res) => {
  const status = true;
  var condition = { status: status };
  Profile.findAll({
    attributes: ["name", "surname", "nickname", "email", "status"],
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Profile.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Profile.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Profile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Profile.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Profile was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Profile.destroy({
    where: {},
    truncate: false,
  })
    .then((num) => {
      res.send({ message: `${num} Profile were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Profile.",
      });
    });
};