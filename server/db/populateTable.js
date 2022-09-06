const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    region: 'us-east-2'
});

const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10'
});

const allUsers = JSON.parse(
    fs.readFileSync(path.join(__dirname, './seeds.json'), 'utf-8')
);

allUsers.forEach(({ username, email, password }) => {
    const params = {
        TableName: "Users-Passivity",
        Item: {
            username,
            email,
            password,
            id: uuidv4(),
            stock: []
        }
    }

    dynamodb.put(params, (err, data) => {
        if(err){
            console.log(err)
        } else {
            console.log(`${username}'s thought uploaded!`)
        }
    })
});