

import { Sequelize } from "sequelize";
import config from "../config/config.js";



const sequelize = new Sequelize(
  config.db_database,
  config.db_user,
  config.db_password,
  {
      host: config.db_host,
      port: config.db_port,
      dialect: config.db_dialect,
  }
)

export default sequelize

// Auto create 
// yarn sequelize-auto -h localhost -d db_food -u root -x 1234 -p 3306 --dialect mysql -o src/models -l esm
