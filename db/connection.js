const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const Currency = require("./model/currency");

let promise;
module.exports = {
  initialize: () => {
    if (promise) {
      return promise;
    } else {
      promise = sequelize
        .authenticate()
        .then(() => {
          console.log(`SQLite successfully connected!`);
          return Currency.sync();
        })
        .then(() => {
          console.log(`Currency table created`);
        })
        .catch((error) => {
          console.error("Unable to connect to SQLite database:", error);
        });
      return promise;
    }
  },
};