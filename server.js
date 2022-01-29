import express from 'express';
import mongoose from 'mongoose';
import Cards from "./dbcard.js"
import Cors from "cors";
//App config

const app = express();
const port = process.env.PORT || 8001

const connectionUrl = 'mongodb://localhost:27017/datingapp';

//Middleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err){
        throw err;
    } else {
        console.log("Connected to MongoDB!!!");
    }
});

//API Endpoints
app.get("/", (req, res) => {
    res.status(200).send("Hello TheWebDev");
});

// postrequest
app.post("/dating/cards", (req, res)=>{
   const dbCard = req.body;
   Cards.create(dbCard, (err, data)=>{
       if(err){
           res.status(500).send(err);
       } else {
           res.status(200).send(data);
       }
   })
})

// getrequest
app.get("/dating/cards", (req, res) => {
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

//Listner
app.listen(port, () => console.log((`Listening on localhost: ${port}`)));
