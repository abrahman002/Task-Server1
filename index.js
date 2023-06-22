const express = require('express');
const app=express();
const cors = require('cors');
const port=process.env.PORT || 5000;


// Midleware

app.use(cors())



// default test

app.get('/',(req,res)=>{
    res.send('server in on ')
})

app.listen(port,()=>{
    console.log('server running')
})