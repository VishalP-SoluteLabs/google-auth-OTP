const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node_sequelize', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})


try {
    sequelize.authenticate();
    console.log('Database Connection has been established successfully. 😀');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}
  
module.exports = sequelize;