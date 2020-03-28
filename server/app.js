const express = require("express");
const router = require("./routes");
const app = express();
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

app.use(awsServerlessExpressMiddleware.eventContext());
app.use("/", router);
module.exports = app;
