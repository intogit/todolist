import express from "express";
import {MongoClient} from "mongodb";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// const { MongoClient } = require("mongodb");
const uri =  "mongodb+srv://ninja:Aninja%401234@cluster0.ahkukt6.mongodb.net/?retryWrites=true&w=majority";


app.post("/signup", async (req, res) => { 
    console.log("i m in server.js------for signup");
    const client = new MongoClient(uri);
    const database = client.db('Todolist');
    const users = database.collection('users');

    // check if user is already exist or not..
    const { userName, password, fullName } = req.body;
    console.log(req.body);
    const user = await users.findOne({userName:userName});
    if(user){
        console.log("user already exists");
        res.status(500);
        res.json({
            message: "user already exist =>.=>. log in ",
        })
        return;
    }
    // if no user exist, add new one
    //P
    try {
        // create the password hash
        const hashedPassword = await bcrypt.hash(password, 10);
        await users.insertOne(
            {
                userName: userName,
                password: hashedPassword,
                fullName: fullName,
            }
        )
        console.log("username successfully added in database");
        res.status(201);
        res.json({
            message: "new user added"
        });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            message: "unable to add user"
        })
    }
    client.close();
});


app.post("/login", async (req, res) => { 
    console.log("i m in server.js ------ for login");
    const client = new MongoClient(uri);
    const database = client.db('Todolist');
    const users = database.collection('users');

    // check if user is already exist or not..
    const { userName, password } = req.body;
    console.log(req.body);
    const user = await users.findOne({userName:userName});
    console.log(user);
    const match =  await bcrypt.compare(password, user.password)
    console.log("match is ", match);
    if(!user || !match){
        console.log("invalid login -- wrong username or password");
        res.status(403);
        res.json({
            message: "invalid login -- wrong username or password"
        })
        return;
    }
    console.log("login successfull");
    res.json({
        message: "Login Successfull",
        fullName: user.fullName
    })
    client.close();
});


app.post("/todo", async (req, res) => { 
    console.log("i m in server.js ------ for todo---POST method");
    const client = new MongoClient(uri);
    const database = client.db('Todolist');
    const users = database.collection('users');
    const userAndTodoList = database.collection('userAndTodoList');

    // check if user is already exist or not..
    const {authorization} = req.headers;
    const todoListItems = req.body;
    console.log(todoListItems);
    const [, token] = authorization.split(" ");
    const [ userName, password ] = token.split(":");

    console.log("------", userName, " ", password, "---------");
    const user = await users.findOne({userName:userName});
    const match = bcrypt.compare(password, user.password);
    if(!user || !match){
        console.log("invalid  access -- bad username or password");
        res.status(403);
        res.json({
            message: "invalid login -- bad username or password"
        })
        return;
    }
    console.log("userrrrrrrrrrr",user);
    const doesUserandTodoListExists =  await userAndTodoList.findOne({userId: user._id});
    console.log(doesUserandTodoListExists);
    if(!doesUserandTodoListExists){
        await userAndTodoList.insertOne({
            userId: user._id,
            todoList: todoListItems,
        });
    }
    else{
        console.log("user found................")
        const filter = {userId:user._id};
        const updateDoc = {
            $set: {
                todoList: todoListItems
            }
        };
        console.log(filter);
        console.log(updateDoc);

        const options = { upsert: true };
        await userAndTodoList.updateOne(filter, updateDoc, options);
    }
    console.log(await userAndTodoList.findOne({userId: user._id}));

    res.json({
        message: "Successfull"
    })
    client.close();
});

app.get("/todo", async (req, res) => { 
    console.log("i m in server.js ------ for todo---GET method");
    const client = new MongoClient(uri);
    const database = client.db('Todolist');
    const users = database.collection('users');
    const userAndTodoList = database.collection('userAndTodoList');

    // check if user is already exist or not..
    const {authorization} = req.headers;
    const [, token] = authorization.split(" ");
    const [ userName, password ] = token.split(":");

    console.log("------", userName, " ", password, "---------");
    const user = await users.findOne({userName:userName});
    const match = bcrypt.compare(password, user.password);
    if(!user || !match){
        console.log("invalid  access -- bad username or password");
        res.status(403);
        res.json({
            message: "invalid login -- bad username or password"
        })
        return;
    }
    console.log(" legit user found................")
    const doesUserAndTodoListExists =  await userAndTodoList.findOne({userId: user._id});
    
    if(doesUserAndTodoListExists){
        const todos = doesUserAndTodoListExists.todoList;
        console.log(todos);
        res.json(todos);
    }
    client.close();
});


app.post("/todo_categories", async (req, res) => {
    console.log("i m in server ------- todo_categoriees");
    const client = new MongoClient(uri);
    const database = client.db('Todolist');
    const users = database.collection('users');
    const category = database.collection('taskCategories');

    const {authorization} = req.headers;
    const newCategoryList = req.body;
    const [, token] = authorization.split(" ");
    const [userName, password] = token.split(":");

    const user = await users.findOne({userName:userName});
    const match = bcrypt.compare(password, user.password);
    if(!user || !match){
        console.log("invalid  access -- bad username or password");
        res.status(403);
        res.json({
            message: "invalid login -- bad username or password"
        })
        return;
    }
    console.log(" legit user found................");

    const doesCategoryExists = await category.findOne({userId: user.id});
    if(!doesCategoryExists){
        console.log("category does not exist");
        await category.insertOne({
            userId: user._id,
            taskCategory: newCategoryList
        })
    }
    else{
        console.log("yes --- category exists");
        await category.updateOne({userId: user._id}, {$set: {taskCategory:newCategoryList}}) 
    }
    console.log(await category.findOne({userId: user._id}));
    res.json({
        message: "Successfull"
    })
    client.close();
})



app.get("/todo_categories", async (req, res) => {
    console.log("i m in server ------- todo_categoriees");
    const client = new MongoClient(uri);
    const database = client.db('Todolist');
    const users = database.collection('users');
    const category = database.collection('taskCategories');

    const {authorization} = req.headers;
    const [, token] = authorization.split(" ");
    const [userName, password] = token.split(":");

    const user = await users.findOne({userName:userName});
    const match = bcrypt.compare(password, user.password);
    if(!user || !match){
        console.log("invalid  access -- bad username or password");
        res.status(403);
        res.json({
            message: "invalid login -- bad username or password"
        })
        return;
    }
    console.log(" legit user found................");

    const doesCategoryExists = await category.findOne({userId: user._id});

    if(doesCategoryExists){
        console.log(doesCategoryExists);
        res.json(doesCategoryExists.taskCategory);
    }
    client.close();
})

app.listen(port,'localhost');