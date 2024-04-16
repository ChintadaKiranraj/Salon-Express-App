require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequences = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_POART,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME
});

sequences.authenticate().then(()=>{
    console.log("Successfully connection database");
}).catch((err)=>{
    console.log("Unable to connect database ? "+err);
});
module.exports = {
    sequences,
}