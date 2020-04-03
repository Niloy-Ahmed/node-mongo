const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ["Asad",'moin','sahed','susmita','sohana','sabana'];
// const rootCall  = (req, res) => res.send('Thank you vary much')

app.get('/Products', (req, res) =>{
         client = new MongoClient(uri, { useNewUrlParser: true });
         client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({name:'mobile'}).limit(10).toArray((err, documents) =>{
            if (err) {
                console.log(err);
                res.status(500).send({massage:err});
            }
            else{
                res.send(documents);
            } 
        });
        client.close();
      });
});

app.get('/product/:id', (req, res) =>{
    const id = req.params.id;

    const name = users[id];
    res.send({id, name});
});
// delete
//update
// post 
app.post('/addProduct', (req,res) =>{
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insert(product,(err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({massage:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });  
 // console.log('data received', req.body);
});
const port = process.env.PROT || 4700;
app.listen(port, () => console.log('Listening to prot 4200'));