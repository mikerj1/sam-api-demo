const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()
const ItemsTable = process.env.ITEMS_TABLE

function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}

exports.handler = async (event, context, callback) => {
  try {
    const item = {...JSON.parse(event.body), id: uuid()}
    await DynamoDB.put({ TableName: ItemsTable, Item: item }).promise()
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(item),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch(e) {
    callback(e)
  }
}