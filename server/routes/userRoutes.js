const router = require('express').Router()
const { v4: uuidv4 } = require('uuid');

const AWS = require('aws-sdk');
const awsConfig = {
    region: 'us-east-2'
};

AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB.DocumentClient()
const table = 'Users-Passivity'

router.get('/users', (req, res) => {
    // this is likely where we input search queries
    const params = {
        TableName: table
    };
    dynamodb.scan(params, (err, data) => {
        if(err) {
            res.status(500).json(err)
        } else {
            res.json(data.Items)
        }
    })
});

// grabs user info for portfolio
router.get('/users/:username', (req, res) => {
    const params = {
        TableName: table,
        KeyConditionExpression: '#un = :username',
        ExpressionAttributeNames: {
            '#un': 'username',
            '#stock': 'stock',
        },
        ExpressionAttributeValues: {
            ':username': req.params.username
        },
        ProjectionExpression: '#un, #stock',
        ScanIndexForward: false
    }
    dynamodb.query(params, (err, data) => {
        if(err) res.status(500).json(err)
        else res.status(200).json(data)
    }
    )
});


// create user
router.post('/users', (req, res) => {
    // hash password w util function
    password = req.body.password
    const params = {
        TableName: table,
        Item: {
            username: req.body.username,
            stock: [],
            password,
            email: req.body.email,
            id: uuidv4(),
        }
    };

    dynamodb.put(params, (err, data) => {
        if(err){
            console.log('checking')
            res.status(500).json(err)
        } else {
            console.log('great success')
            res.status(200).json(data)
        }
    })
})

// login (currently just a find by username)
router.post('/login/:username', (req, res) => {
    const params = {
        TableName: table,
        KeyConditionExpression: '#un = :username',
        ExpressionAttributeNames: {
            '#un': 'username',
            '#pw': 'password',
        },
        ExpressionAttributeValues: {
            ':username': req.params.username
        },
        ProjectionExpression: '#pw, #un',
        ScanIndexForward: false
    }
    dynamodb.query(params, (err, data) => {
        if(err) res.status(500).json(err)
        // on the else, check for correct pw => if no, auth err, else res.json(data)
        else res.status(200).json(data)
    })
})

module.exports = router