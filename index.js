const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const ObjectId = require('mongodb').ObjectId;


app.use(bodyParser.json())
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const uri = `mongodb+srv://Hasan:${process.env.PASS}@cluster0.ourdc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const eventsCollection = client.db("hasan-database").collection("volunteer");
    const registrations = client.db("volunteer").collection("registrations");

    app.get('/showallvolunteer', (req, res) => {
        eventsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/AddRegistrations', (req, res) => {
        const registrationsDetails = req.body;
        registrations.insertOne(registrationsDetails)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result.insertedCount > 0)
            })
    })


    // it will show on terminal when database is connected successfully
    console.log('connected');

});

app.listen(process.env.PORT)
