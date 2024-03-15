import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Player from './player-side/player.js';
import { createPlayerStats } from './player-side/player.js';
import pg from "pg"

const app = express();
const port = 8080;
const db = new pg.Client({
    host: "localhost",
    user: "postgres",
    database: "hereafter",
    password: "dxy0430BIOON",
    port: "5432",
})

await db.connect();


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

app.get("/blog",async (req,res)=>{
    //test api json code TODO: link to player database
    

    try{

        let result = await db.query('SELECT * FROM blog ORDER BY id DESC');
        let posts = result.rows;

        res.json(posts);

    }catch(err){
        console.error(err);
    }
})

app.post("/blog/post", async (req,res)=>{
    try{
        
        let result = await db.query('INSERT INTO blog (title, post) VALUES ($1, $2);', 
        [req.body.title, req.body.post]
        );
        
    }catch(err){
        console.error(err);
    }
});

app.post("/blog/delete", async (req,res)=>{
    try{
        
        let result = await db.query('DELETE FROM blog WHERE id = ($1);', 
        [req.body.id]
        );
        
    }catch(err){
        console.error(err);
    }
});

app.patch("/blog/edit", async(req,res)=>{
    try{
        let result = await db.query('UPDATE blog SET title = ($1), post = ($2) WHERE id = ($3)',
        [req.body.title, req.body.post, req.body.id] );
        res.end();
    }catch(err){
        console.error(err);
    }
})

app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})