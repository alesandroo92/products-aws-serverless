const AWS = require("aws-sdk");

const updateProduct = async(event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const { name, description, stock } = JSON.parse(event.body);

        if(typeof name !== "string") {
            return "Ingrese un nombre correcto"
        } else if(typeof description !== "string") {
            return "Ingrese una descripción correcta"
        } else if(typeof stock !== "string") {
            return "Ingrese un stock correcto"
        } 
        
        await dynamoDb.update({
            TableName: "ProductsTable",
            Key: {id},
            UpdateExpression: "set #name = :name, description = :description, stock = :stock", // se le asigna #porque name solo es una palabra reservada
            ExpressionAttributeValues: {
                ":name": name,
                ":description": description,
                ":stock": stock,
            },
            ExpressionAttributeNames: {
                "#name": "name" // aca le decimos que #name significa name
            },
            ReturnValues: "ALL_NEW",
        }).promise();
        
        return {
            status: 200, // aca ponerle status y si no funciona derjarlo como statusCode
            body: JSON.stringify({ msg: "Producto actualizado correctamente" })
        }

    } catch (error) {
        console.log("Ha ocurrido el siguiente error: "+error)
    }
};

module.exports = { updateProduct }