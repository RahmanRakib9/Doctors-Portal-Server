const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjr1x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
     try {
          await client.connect();
          console.log('db connected');

          
          

     }
     finally {
          // await client.close();
     }
}
run().catch(console.dir)

client.connect(err => {
     const collection = client.db("test").collection("devices");
     // perform actions on the collection object
     client.close();
});


app.get('/', (req, res) => {
     res.send('Hello Doctors World!')
})

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})