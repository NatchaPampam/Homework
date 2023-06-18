const db = require("../models");
const Users = db.User;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  };
  const data = {
    username: req.body.username,
    password: req.body.password,
    status: req.body.status ? req.body.status : false,
  };
  Users.create(data)
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
  Users.findAll({ attributes: ["username", "password", "status"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while Retrieve Users Data.",
      });
    });
};

exports.getOnly = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Users with id=" + id,
      });
    });
};

exports.findAllTrue = (req, res) => {
  const status = true;
  var condition = { status: status };
  Users.findAll({
    attributes: ["username", "password", "status"],
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Users was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${id}. Maybe Users was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Users with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Users was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Users with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Users.destroy({
    where: {},
    truncate: false,
  })
    .then((num) => {
      res.send({ message: `${num} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
};