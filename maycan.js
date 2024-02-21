const express = require('express');
const mongoose = require ('mongoose');

const mayroutes = require('./api-routes/mayroutes.js'); 

const app = express();
const PORT = process.env.PORT || 9001;


mongoose.connect('mongodb+srv://maymaming002:XNs07oByVQ6TrXnb@cluster0.seliz0f.mongodb.net/?retryWrites=true&w=majority')
.then (() => {
  console.log('Connected to MOngoDB')
}).catch ((error) => {
  console.log()
})

app.use(express.json()); 

app.use('/may/api', mayroutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
