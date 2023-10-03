const express =require('express');
const cors = require('cors')
const bodyParser =require('body-parser')
const noteRouter =require('./route/noteRoute')
const userRouter =require('./route/userRoute')
// const crypto = require('crypto');
// const mongoose = require('mongoose');
const db = require('./config/database');
require('dotenv').config()
const app=express();
const port =process.env.PORT;

// =============cors=======
app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.get('/', function (req, res) {
//     res.send('Hello World.................')
//   })



app.use('/api',noteRouter)
app.use('/api',userRouter)



// // Generate 16 random bytes
// const randomBytes = crypto.randomBytes(16);

// // Convert the random bytes to a hexadecimal string
// const randomHex = randomBytes.toString('hex');

// console.log(randomHex);





// mongoose.connect('mongodb://127.0.0.1:27017/note')
//   .then(() => console.log('Connected!'));
db.database();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })