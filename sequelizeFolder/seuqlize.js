
const Sequelize = require('sequelize');
const sequelize = new Sequelize('UserInfoDB', 'admin', '12345678', {
    host: 'database.cdzhujgnp8xm.us-east-2.rds.amazonaws.com',
    dialect: 'mysql'
  });
  const connect= sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const usersTable = require('../models/users')(sequelize,Sequelize.DataTypes);
module.exports = usersTable;
