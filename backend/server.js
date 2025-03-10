const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbURI = "mongodb+srv://Atharwaah:Priyansh24@node-tut.ojefeco.mongodb.net/"
const app = express();
const port = 4000;
const bodyParser = require('body-parser');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongoose connected successfully!');
  })
  .catch((err) => {
    console.log('Failed connection', err);
  })

// mongoose.connect("mongodb://127.0.0.1:27017/wt").then(()=>{
//   console.log("Successfully connected to local mongo instance!");
// }).catch((err)=>{
//   console.log("Failed connection to local mongo instance");
// })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
