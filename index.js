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
  

app.post('/registered', (req,res)=>{
      
    const password = req.body.password
    const email = req.body.email
   console.log(email, password)
   
   registerCollection.insertOne({email,  password})
               .then(result => {
                  
                  res.send(result.insertedCount > 0);
                  
                   
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





