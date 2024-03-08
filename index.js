import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Player from './player-side/player.js';
import { createPlayerStats } from './player-side/player.js';

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));//parses user requests

app.get("/player",async (req,res)=>{
    //test api json code TODO: link to player database
    let Joe = new Player("Joe", createPlayerStats(), [], [], []);
    try{
        res.json(Joe);
    }catch(err){
        console.error(err);
    }
})

app.get("/player/check",async (req,res)=>{
    //test api json code TODO: link to player database
    let Joe = new Player("Joe", createPlayerStats(), [], [], []);

    try{
        res.json(Joe.playerStatCheck("PHY"));
    }catch(err){
        console.error(err);
    }
})

app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})