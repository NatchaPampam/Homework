module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
      name: {type: Sequelize.STRING(50)},
      surname: {type: Sequelize.STRING(50)},
      nickname: {type: Sequelize.STRING(50)},
      email: {type: Sequelize.STRING(50)},
      status: {type: Sequelize.BOOLEAN},
    });
    return Profile;
};