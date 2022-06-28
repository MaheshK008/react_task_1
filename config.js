const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  mongoURI: process.env.MONGOOSE_URI,
  db: process.env.DATABASE,
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  algorithm: process.env.ALGORITHM,
};
