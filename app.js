const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const feedRoutes = require('./routes/feed');


const app = express();

app.use(bodyParser.json()); 



app.use('/feed', feedRoutes);


mongoose
  .connect(
    //You need to past you URL here 
    'URL'
  )
  .then(result => {
    console.log('connected');
    app.listen(3000);
  })
  .catch(err => console.log(err));
