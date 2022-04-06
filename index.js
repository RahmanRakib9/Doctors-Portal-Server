const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(bodyParser.json())
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjr1x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
     try {
          await client.connect();
          const database = client.db('doctors_portal');
          const appointmentsCollection = database.collection('appointments');

          //post data to db
          app.post('/appointments', async (req, res) => {
               const appointment = req.body;
               const result = await appointmentsCollection.insertOne(appointment);

               res.json(result);
          })

          //get data from db
          app.get('/appointments', async (req, res) => {
               const email = req.query.email;
               const date = new Date(req.query.date).toLocaleDateString();
               const query = { email: email, date: date }

               const cursor = appointmentsCollection.find(query);
               const appointments = await cursor.toArray();
               res.json(appointments);
          })

     }
     finally {
          // await client.close();
     }
}
run().catch(console.dir)


app.get('/', (req, res) => {
     res.send('Hello Doctors World!')
})

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})