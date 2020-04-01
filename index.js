const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbUser = "dbUser"
const pass = "Pan5KId7b8YG9kRF"
const uri = "mongodb+srv://dbUser:Pan5KId7b8YG9kRF@cluster0-bdgwg.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
const users = ["Asad",'moin','sahed','susmita','sohana','sabana'];
// const rootCall  = (req, res) => res.send('Thank you vary much')

app.get('/', (req, res) =>{
    const fruit = {
        product : " ada",
        price: 1220,
    }
    res.send(fruit)
});

// app.get('/fruits/banana',(req, res) => {
//     res.send({fruit:'banana', Quantity:1000, price:30000})
// });
app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
})

// post 

app.post('/addProduct', (req,res) =>{
    //save to database
    const product = req.body;
    
    console.log(product);

    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.insertOne(product, (err, res) =>{
            console.log('successfully insert', res);
            // res.send(product);
        });
        client.close();
      });
 // console.log('data received', req.body);
})

app.listen(3000, () => console.log('Listening to prot 3000'));