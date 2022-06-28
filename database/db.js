const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

//LOS PARÁMETROS DE CONEXIÓN
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  
});

async function conectar() {
  try {
    await sequelize.authenticate();
    console.log('La conexión se ha establecido con éxito.');
  } catch (error) {
    console.error(' No se puede conectar a la base de datos:', error);
  }
}
conectar();

sequelize.sync({ force: false })
  .then(() => { console.log("Tablas sincronizadas"); })
  .catch((err) => { console.log("Tablas no sincronizadas, error: ", err); })

//----------------------------------------------------------------------------------//
module.exports = {
  sequelize,
  DataTypes,
  Op,
  QueryTypes
}