const { default: mongoose } = require("mongoose");
const config = require("../config/config");

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(config.DATABASE_URL.toString());
      return mongoose.connection;
    } catch (err) {
      throw err;
    }
  },
};
