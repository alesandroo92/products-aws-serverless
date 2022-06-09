const { v4 } = require("uuid");
const AWS = require("aws-sdk");


const addProduct = async(event, next) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();

   const { name, description, stock } = JSON.parse(event.body);
   const createdAt = new Date();
   const id = v4();

   const newProduct = { id, name, description, stock, createdAt }

   if(typeof name !== "string") {
       return "Ingrese un nombre correcto"
   } else if(typeof description !== "string") {
       return "Ingrese una descripción correcta"
   } else if(typeof stock !== "string") {
       return "Ingrese un stock correcto"
   } 

   await dynamoDb.put({
       TableName: "ProductsTable",
       Item: newProduct
   }).promise();

   return {
       statusCode: 200, // aca ponerle status y si no funciona derjarlo como statusCode
       body: JSON.stringify({
           msg: "Producto adherido correctamente",
           newProduct
       })
   }
    } catch (error) {
        console.log("Ha ocurrido el siguiente error: "+error)
    }
};


module.exports = { addProduct }