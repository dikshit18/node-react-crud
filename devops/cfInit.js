require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");

const contents = fs.readFileSync("./cfScript.yaml");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  region: "ap-south-1"
});
const cloudFormation = new AWS.CloudFormation({ region: "ap-south-1" });
const params = {
  StackName: "DynamoLambdaProductStack" /* required */,
  OnFailure: "DELETE",
  TemplateBody: `${contents}`
};

cloudFormation.createStack(params, function(err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
