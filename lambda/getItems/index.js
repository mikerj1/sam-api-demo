const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()
const ItemsTable = process.env.ITEMS_TABLE

exports.handler = async (event, context, callback) => {
  try {
    const { Items } = await DynamoDB.scan({ TableName: ItemsTable }).promise()
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(Items),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch(e) {
    callback(e)
  }
}