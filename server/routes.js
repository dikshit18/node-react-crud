const routes = require("express").Router();
const { createProduct, deleteProduct, getProdudcts } = require("./dynamoDb");
routes.get("/products", getProdudcts);
routes.post("/products", createProduct);
routes.delete("/products", deleteProduct);
routes.put("/products", createProduct);
module.exports = routes;
