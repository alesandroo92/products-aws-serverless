"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hell world from Serverless!"
      },
      null,
      2
    ),
  };
};
