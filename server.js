import express from "express";
import {MongoClient} from "mongodb";
import cors from "cors";
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// const { MongoClient } = require("mongodb");
const uri =  "mongodb+srv://ninja:Aninja%401234@cluster0.ahkukt6.mongodb.net/?retryWrites=true&w=majority";


app.post("/register", async (req, res) => { 
    console.log("i m in server.js------for register");
    const client = new MongoClient(uri);
    const database = client.db('Todolist');
    const users = database.collection('users');

    // check if user is already exist or not..
    const { username, password } = req.body;
    console.log(req.body);
    const user = await users.findOne({username:username});
    if(user){
        console.log("user already exists");
        res.status(500);
        res.json({
            message: "user already exist"
        })
        return;
    }
    // if no user exist, add new one
    await users.insertOne(req.body);
    console.log("username successfully added in database");
    client.close();
    res.json({
        message: "new user added"
    }); 
});


app.post("/login", async (req, res) => { 
    console.log("i m in server.js ------ for login");
    const client = new MongoClient(uri);
    const database = client.db('Todolist');
    const users = database.collection('users');

    // check if user is already exist or not..
    const { username, password } = req.body;
    console.log(req.body);
    const user = await users.findOne({username:username});
    if(!user || user.password !== password){
        console.log("invalid login -- wrong username or password");
        res.status(403);
        res.json({
            message: "invalid login -- wrong username or password"
        })
        return;
    }
    console.log("login successfull");
    res.json({
        message: "Login Successfull"
    })
    client.close();
    // // if no user exist, add new one
    // await users.insertOne(req.body);
    // console.log("username successfully added in database");
    // client.close();
    // res.json({
    //     message: "new user added"
    // }); 
});




app.listen(port,'localhost');