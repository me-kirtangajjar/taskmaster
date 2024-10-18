const express = require("express");
const databaseService = require("./services/databaseService");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const httpError = require("./util/httpError");

const app = express();

(async () => {
  try {
    
    const connection = await databaseService.connect();
    console.log("DB Connected", connection.name);
  } catch (err) {
    throw err;
  }
})();

app.use(express.json());

app.use("/api/v1", require("./routes/route"));

// Global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.info(`Server is running on port ${process.env.PORT}`);
});
