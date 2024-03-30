import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Player from './player-side/player.js';
import { createPlayerStats } from './player-side/player.js';
import pg from "pg"
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import MemoryStore from 'memorystore';
const Memory = MemoryStore(session);

const thewords = process.env.THE_WORDS;
let database_url = process.env.DATABASE_URL;
const app = express();
const port = process.env.PROD_PORT;

/*const db = new pg.Client({
    host: "localhost",
    user: "postgres",
    database: "hereafter",
    password: "dxy0430BIOON",
    port: "5432",
})*/
const db = new pg.Client(database_url);
//postgresql://
await db.connect();


app.use(cors({
    origin: true,
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));//parses user requests
app.use(
    session({
    secret: "SECRET", 
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60
    },
    store: new Memory({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
}))
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/players",async (req,res)=>{
    
    
    try{
        //for retrieving player information
        let result = await db.query(
        'SELECT * FROM stats FULL OUTER JOIN players ON players.player_id = stats.player_id ORDER BY players.player_id ASC;'
        );
        let posts = result.rows;

        res.json(posts);

    }catch(err){
        console.error(err);
    }
})

app.get("/player/check",async (req,res)=>{

    try{
        let result = await db.query("SELECT ($1) FROM stats WHERE player_id = (SELECT player_id FROM players WHERE player_name = ($2))",
        [req.body.statName, req.body.playerName]);
        let statcheck = result.rows;
        res.json(statcheck);
    }catch(err){
        console.error(err);
    }
})

app.get("/compendium", async (req,res)=>{
    try{
        let result = await db.query("SELECT * FROM skills ORDER BY id ASC;",
        []);
        let cards = result.rows;
        res.json(cards);

    }catch(err){
        console.error(err);
    }
});

app.get("/blog",async (req,res)=>{

    try{

        let result = await db.query('SELECT * FROM blog ORDER BY id DESC');
        let posts = result.rows;

        res.json(posts);
        
    }catch(err){
        console.error(err);
    }
})


app.get("/blog/:blogid",async (req,res)=>{

    try{

        let result = await db.query('SELECT * FROM blog WHERE id = ($1)', [req.params.blogid]);
        let post = result.rows[0];
        res.json(post);
        
    }catch(err){
        console.error(err);
    }
});

app.post("/blog/post", async (req,res)=>{
    try{
        
        let result = await db.query('INSERT INTO blog (title, post) VALUES ($1, $2);', 
        [req.body.title, req.body.post]
        );
        res.json(result.rows)
    }catch(err){
        console.error(err);
    }
});


app.post("/blog/:blogid/delete", async (req,res)=>{
    try{
        
        let result = await db.query('DELETE FROM blog WHERE id = ($1);', 
        [req.params.blogid]
        );
        res.redirect(`back`)
    }catch(err){
        console.error(err);
    }
});

app.post("/blog/:blogid/edit", async(req,res)=>{

    try{
        let result = await db.query('UPDATE blog SET title = ($1), post = ($2) WHERE id = ($3)',
        [req.body.title, req.body.post, req.params.blogid] );
        res.redirect(`back`)
    }catch(err){
        console.error(err);
    }
});
//failure to sign into session
app.get("/fail", (req,res)=>{
    res.json({message: "Failed."})
    res.end();
});
//successful sign in


app.post("/session", passport.authenticate("local",{
    failureRedirect: "/fail",
}),(req,res)=>{
    if(req.isAuthenticated()){

        res.json({message: "Success."})
        res.end();
    }else{
        res.redirect("/fail");
    }
});

app.get("/sess", async(req,res)=>{
 
    if(req.isAuthenticated()){
        
        console.log("Success!");
        res.json({message: "Success."})
        res.end();
    }else{
        res.redirect("/fail");
    }
});

passport.use(
    new Strategy(function verify(username, password, cb){
        try{
            const user = {name: "the one"};
           
            if(password===thewords){
                return cb(null, user)
            }else{
                return cb(null, false);
            }
        }catch(err){
            console.error(err);
        }
}))

passport.serializeUser((user,cb)=>{
    cb(null, user);
});

passport.deserializeUser((user,cb)=>{
    cb(null, user);
});

app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})

export default app;