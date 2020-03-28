require("dotenv").config();
const AWS = require("aws-sdk");
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
// });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TableName;
const uuid = require("uuid");

const createOrUpdateProduct = async (req, res) => {
  //To Do - Add JOI validations
  const Item = req.body;
  let message, statusCode, id;
  if (!Item.productId) {
    id = uuid.v4();
    Item.productId = id;
    statusCode: 201;
    message = "Product created sucessfully.";
  }
  const params = {
    TableName,
    Item: {
      ...Item
    }
  };
  try {
    await dynamoDb.put(params).promise();
    return res.status(201).send({
      statusCode: statusCode || 200,
      message: message || "Product updated successfully.",
      productId: id
    });
  } catch (error) {
    console.log("Error while storing item into database...", error);
    return res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Please try again"
    });
  }
};
const getProducts = async (req, res) => {
  //To Do - Add JOI validations
  const params = {
    TableName
  };
  try {
    const items = await dynamoDb.scan(params).promise();
    return res.status(201).send({ statusCode: 201, data: items.Items });
  } catch (error) {
    console.log("Error while scanning database...", error);
    return res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Please try again"
    });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productid;
  const params = {
    TableName,
    Key: {
      productId
    }
  };
  console.log("productid", productId);

  try {
    const items = await dynamoDb.delete(params).promise();
    return res
      .status(200)
      .send({ statusCode: 200, message: "Product deleted successfully." });
  } catch (error) {
    console.log("Error while deleting item from database...", error);
    return res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Please try again"
    });
  }
};

module.exports = { createOrUpdateProduct, deleteProduct, getProducts };
