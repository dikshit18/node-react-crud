const routes = require("express").Router();
const {
  createOrUpdateProduct,
  deleteProduct,
  getProducts
} = require("./dynamoDb");
routes.get("/products", getProducts);
routes.post("/products", createOrUpdateProduct);
routes.delete("/products/:productid", deleteProduct);
routes.put("/products", createOrUpdateProduct);
module.exports = routes;
