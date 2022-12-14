const express = require('express')
require('dotenv').config();
const client = require('./db')
const { body, validationResult } = require('express-validator');

const cors = require('cors');
const app = express()
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

const port = process.env.PORT || 5000
app.use(express.json());
app.use(express.static('../portfolio'));

app.use(cors());
app.use(cors({
  origin: '*'
}));
app.get('/', (req, res) => {
  res.status(200).json({message:"ok"});
})
// create table contact (name text , email text , message varchar(500) ) ;
app.post('/contact' ,[
    body('email' , 'Enter a valid Email').isEmail()
] ,async (req,res)=>{
    
    const errors = validationResult(req).errors;
    if (errors.length!=0) {
        return res.status(400).json({ errors: errors.message, value:-2 });
    }
    try {
        const {name , email , message } = req.body ;
    const data = await client.query(`insert into contact values ( '${name}' , '${email}' , '${message}') ; `)
    res.status(200).json({message:"ok" , value : 0});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"contac form is not submitted..." , value :-1}) ;
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})