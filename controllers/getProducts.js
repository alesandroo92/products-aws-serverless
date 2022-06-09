const AWS = require("aws-sdk");

const getProducts = async(event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamoDb.scan({ TableName: "ProductsTable" }).promise();
        const tasks = result.Items;

        return {
            status: 200,
            body: tasks
        };

    } catch (error) {
        console.log("Ha ocurrido el siguiente error: "+error)
    }
};

module.exports = { getProducts }