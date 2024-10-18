require("dotenv").config();

module.exports = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,
};
