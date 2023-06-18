module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {type: Sequelize.STRING(50)},
      password: {type: Sequelize.STRING},
      status: {type: Sequelize.BOOLEAN},
    });
    return User;
};