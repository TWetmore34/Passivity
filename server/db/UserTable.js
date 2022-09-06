const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10' });

const params = {
    TableName: 'Users-Passivity',
    KeySchema: [
        { AttributeName: 'username', KeyType: 'HASH' },
        { AttributeName: 'id', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'username', AttributeType: 'S' },
        { AttributeName: 'id', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    },
}

dynamodb.createTable(params, (err, data) => {
    if(err) {
        console.error(JSON.stringify(err, null, 2))
    } else {
        console.log(JSON.stringify(data, null, 2))
    }
})