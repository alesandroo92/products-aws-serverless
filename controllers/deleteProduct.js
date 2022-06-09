const AWS = require("aws-sdk");

const deleteProduct = async(event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        await dynamoDb.delete({ 
        TableName: "ProductsTable",
        Key: {id}
    
    }).promise();

    return {
        status: 200, 
        body: JSON.stringify({ msg: "Producto eliminado correctamente" })
    }

    } catch (error) {
        console.log("Ha ocurrido el siguiente error: "+error)
    }
};

module.exports = { deleteProduct }