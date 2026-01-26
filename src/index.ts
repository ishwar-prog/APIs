import express from "express";

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    return res.json({status:'Server running'})
})

app.listen(8000,()=> console.log(`Express server is running on port 8000`))