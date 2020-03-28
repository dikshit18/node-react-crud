require("dotenv").config();
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TableName;
const uuid = require("uuid");

const createProduct = async (req, res) => {
  //To Do - Add JOI validations
    const Item = req.body;
    if (!Item.productId) {
      Item.productId = uuid.v4()
  }
  const params = {
    TableName,
    Item: {
      ...Item
    }
  };
  try {
    await dynamoDb.put(params).promise();
    return res
      .status(201)
      .send({ statusCode: 201, message: "Product added sucessfully." });
  } catch (error) {
    console.log("Error while storing item into database...", params.Item);
    return res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Please try again"
    });
  }
};
const getProducts = (req, res) => {
     //To Do - Add JOI validations
  const params = {
    TableName
  };
  try {
    const items = await dynamoDb.scan(params).promise();
    return res
      .status(201)
      .send({ statusCode: 201, data: items.Items });
  } catch (error) {
    console.log("Error while scanning database...");
    return res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Please try again"
    });
  }
};

const deleteProduct = (res, res) => {
    const productId = rws.query.productId
    const params = {
        TableName,
        Key: {
            productId
        }
  };
  try {
    const items = await dynamoDb.delete(params).promise();
    return res
      .status(201)
      .send({ statusCode: 201, data: items.Items });
  } catch (error) {
    console.log("Error while scanning database...");
    return res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Please try again"
    });
  }
};

module.exports = { createProduct, deleteProduct, getProducts };
