'use strict';
module.exports = (sequelize, DataTypes) => {
  const invoice = sequelize.define('invoice', {
    invoiceid: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.INTEGER,
    settledAt: DataTypes.DATE
  }, {});
  invoice.associate = function(models) {
    // associations can be defined here
    // invoice.belongsTo(user)
  };
  return invoice;
};