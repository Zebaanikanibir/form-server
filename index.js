const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const port = process.env.PORT || 5000




const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const uri = "mongodb+srv://register:zebaanikanibir@cluster0.x4chh.mongodb.net/regCollection?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    
  const registerCollection = client.db("regCollection").collection("users");
  const imagesCollection = client.db("regCollection").collection("images");

app.post('/registered', (req,res)=>{
      
//     const password = req.body.password
//     const email = req.body.email
//    console.log(email, password)
const newEvent = req.body;
      console.log('adding', newEvent)
     
   
   registerCollection.insertOne(newEvent)
               .then(result => {
                  
                  res.send(result.insertedCount > 0);
                  
                   
               })
   
    })

    app.get('/users',(req,res)=>{
      console.log('email',req.query.email)
      registerCollection.find({email: req.query.email})
      .toArray((err, items) => {
      console.log(err)
        res.send(items)

      })

    })
    
});


console.log(uri)



app.get('/', (req, res)=>{



    res.send('hello nibir')
});


app.listen(port, ()=>{

console.log(`server is running ${port}`)

})





