import { Sequelize } from "sequelize";
import env from "dotenv"
env.config()


export const sequelize = new Sequelize('interval_todo', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false //DISABLE DATABASE LOGGING DETAILS
  });


export const connect=()=>{
    sequelize.sync()
    .then(() => console.log('MySQL connected...'))
    .catch(err => console.log('Error: ' + err));
  
}
  
 
