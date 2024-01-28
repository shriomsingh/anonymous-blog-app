const express = require('express');
const dotenv = require("dotenv");
const connectDatabase = require("./Helpers/database/connectDatabase");
const User = require("./Models/user");


const serverRoute = require("./Routes/index");
dotenv.config()


const app = express();
const port = 8080;

connectDatabase();

app.use(express.json())
app.use("/", serverRoute);


app.use((err, req, res, next) => {
    if(err.name === "ValidationError"){
        return res.status(400).json({error : err.message, status: 400});
    }
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


// app.get('/createUser', async(req, res) => {
//     try{
//         // const newUser = new User({
//         //     username: 'testUserr',
//         //     email: 'testuser@example.com',
//         //     password: "testpassword",
//         // });
//         // const savedUser = await newUser.save();
//         const savedUser = await User.find().select("+password");
//         console.log("User created Successfull", savedUser);
//         res.status(201).json(savedUser);
//     } catch(error){
//         if(error.code == 11000 && error.keyPattern && error.keyPattern.username){
//             return res.status(400).json({error: "Username already exist."});
//         }
//         console.error("Error creating user: ", error.message);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

app.get('/', (req, res) => {
    res.json("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});


