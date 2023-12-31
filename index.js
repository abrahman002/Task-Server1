const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



// Midleware

app.use(cors())
app.use(express.json());



//mongodb method 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6kes8os.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const userCollection = client.db('taskUserDb').collection('userInfo')



app.get('/user', async (req, res) => {
    const result = await userCollection.find().toArray();
    res.send(result);
})

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await userCollection.findOne(query);
    res.send(result)
})
app.post('/user', async (req, res) => {
    const user = req.body;
    const result = await userCollection.insertOne(user);
    res.send(result);
})
app.put('/user/:id',async(req,res)=>{
    const id=req.params.id;
    const updatedUser=req.body;
    console.log(updatedUser)
    const filter={_id: new ObjectId(id)};
    const optional={upsert:true}
    const user={
      $set:{
        name:updatedUser.name,
        email:updatedUser.email,
        phone:updatedUser.phone
      }
    }

    const result=await userCollection.updateOne(filter,user,optional);
    res.send(result)
  })

app.delete('/user/:id',async(req,res)=>{
    const id=req.params.id;
    const query={_id: new ObjectId(id)}
    const result=await userCollection.deleteOne(query);
    res.send(result)
  })



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// default test

app.get('/', (req, res) => {
    res.send('server in on ')
})

app.listen(port, () => {
    console.log('server running')
})