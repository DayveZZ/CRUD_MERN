const mongoose = require(mongoose);

async function dbConnection() {
  return mongoose.connect("mongodb://127.0.0.1:27017/crudDB");
}

module.exports = dbConnection;
