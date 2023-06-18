const dbConfig = require("../../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  pool: {
    connectionLimit: dbConfig.pool.connectionLimit,
    maxIdle: dbConfig.pool.maxIdle,
    idleTimeout: dbConfig.pool.idleTimeout,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connect model,Database
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Profile = require("./profile.model.js")(sequelize, Sequelize);

module.exports = db;