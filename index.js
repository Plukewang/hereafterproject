import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));//parses user requests

app.get("/",(req,res)=>{
    res.json({
        id: 1,
        name: "Hello!",
    });
})

app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})