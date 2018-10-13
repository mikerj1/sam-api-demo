const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()
const ItemsTable = process.env.ITEMS_TABLE

exports.handler = async (event, context, callback) => {
  try {
    console.log('event is: ', JSON.stringify(event, null , 2))
    await DynamoDB.delete({ TableName: ItemsTable, Key: { id: event.pathParameters.id }} ).promise()
    callback(null, {
      statusCode: 200,
      body: '',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch(e) {
    callback(e)
  }
}