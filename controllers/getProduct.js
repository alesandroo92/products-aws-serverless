const AWS = require("aws-sdk");

const getProduct = async(event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const result = await dynamoDb.get({
            TableName: "ProductsTable",
            Key: { id: id }
        }).promise()
        
        const tasks = result.Item;

        return {
            status: 200,
            body: tasks
        };

    } catch (error) {
        console.log("Ha ocurrido el siguiente error: "+error)
    }
};

module.exports = { getProduct }