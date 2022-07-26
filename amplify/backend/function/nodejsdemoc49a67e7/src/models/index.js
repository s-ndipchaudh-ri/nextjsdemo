const  Sequelize  = require("sequelize");

var sequelize = require('../dbConnection').sequelize;

module.exports = {
  // customers : require('./customer')(Sequelize,sequelize,Sequelize.DataTypes),
  users : require('./user')(Sequelize,sequelize,Sequelize.DataTypes),
  vendor_customer : require('./vendor_customer')(Sequelize,sequelize,Sequelize.DataTypes),
  customerform : require('./customerform')(Sequelize,sequelize,Sequelize.DataTypes)
}


/*
Vendor Form : 
name
email
dob



*/